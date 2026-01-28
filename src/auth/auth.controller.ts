import { Request, Response } from 'express';
import { loginUser, registerUser } from './auth.service';

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const token = await loginUser(email, password, role);

  res.status(200).json({ token });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const token = await registerUser(name, email, password, role);

  res.status(201).json({ token });
}