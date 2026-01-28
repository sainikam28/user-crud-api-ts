import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { signToken } from '../utils/jwt';
import { ApiError } from '../errors/apiError';

export const loginUser = async (email: string, password: string, role: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');;
  }

  const token = signToken({ id: user._id, email: user.email, role: user.role });

  return token;
};

export const registerUser = async (name: string, email: string, password: string, role: string) => {
  const existingUser = await User.findOne({email});
  
  // Check if user already exists
  if (existingUser) {
    throw new ApiError(409, 'User already exists');
  }

  const user = new User({ name, email, password, role });
  await user.save();

  return signToken({ id: user._id, email: user.email, role: user.role });
}
