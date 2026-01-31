import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { signToken } from '../utils/jwt';
import { ApiError } from '../errors/apiError';

export const loginUser = async (email: string, password: string, role: string) => {
  console.log('[loginUser Service] Attempting login for email:', email);
  
  const user = await User.findOne({ email });

  if (!user) {
    console.log('[loginUser Service] User not found for email:', email);
    throw new ApiError(401, 'Invalid credentials');
  }

  console.log('[loginUser Service] User found, verifying password for email:', email);
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log('[loginUser Service] Password mismatch for email:', email);
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = signToken({ id: user._id.toString(), email: user.email, role: user.role });
  console.log('[loginUser Service] Login successful, token generated for email:', email);

  return token;
};

export const registerUser = async (name: string, email: string, password: string, role: string) => {
  console.log('[registerUser Service] Registration attempt for email:', email, 'name:', name);
  
  const existingUser = await User.findOne({email});
  
  if (existingUser) {
    console.log('[registerUser Service] User already exists for email:', email);
    throw new ApiError(409, 'User already exists');
  }

  console.log('[registerUser Service] Creating new user for email:', email);
  const user = new User({ name, email, password, role });
  await user.save();
  
  console.log('[registerUser Service] User created successfully, generating token for email:', email);
  return signToken({ id: user._id.toString(), email: user.email, role: user.role });
}
