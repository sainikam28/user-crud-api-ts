import { Request, Response } from 'express';
import { loginUser, registerUser } from './auth.service';
import { successResponse } from '../utils/response';

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  
  console.log('[login Controller] Login attempt for email:', email, 'with role:', role);

  const token = await loginUser(email, password, role);
  
  console.log('[login Controller] Login successful for email:', email);
  return successResponse(res, { token }, 'Login successful');
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  
  console.log('[register Controller] Registration attempt for email:', email, 'name:', name, 'role:', role);

  const token = await registerUser(name, email, password, role);

  console.log('[register Controller] User registered successfully for email:', email);
  return successResponse(res, { token }, 'User registered successfully');
}