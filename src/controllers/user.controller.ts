import { Request, Response } from 'express';
import User from '../models/user.model';
import asyncHandler from '../utils/asyncHandler';
import { ApiError } from '../errors/apiError';

// CREATE
export const createUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  }
);

// READ ALL
export const getUsers = asyncHandler(
  async (_req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
  }
);

// READ ONE
export const getUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    res.json(user);
  }
);

// UPDATE
export const updateUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    res.json(user);
  }
);

// DELETE
export const deleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    res.status(204).send();
  }
);
// (Must Know)  
// 🧠 Controller Design Principles

// No DB connection logic

// No response formatting logic

// Only request → action → response