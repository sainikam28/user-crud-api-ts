import { Request, Response } from 'express';
import { loginUser, registerUser } from './auth.service';
import { successResponse } from '../utils/response';

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const token = await loginUser(email, password, role);
  return successResponse(res, { token }, 'Login successful');
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const token = await registerUser(name, email, password, role);

  return successResponse(res, { token }, 'User registered successfully');
}