import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { signToken } from '../utils/jwt';

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = signToken({ id: user._id, email: user.email });

  return token;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({email});
  
  // Check if user already exists
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = new User({ name, email, password });
  await user.save();

  return signToken({ id: user._id, email: user.email });
}
