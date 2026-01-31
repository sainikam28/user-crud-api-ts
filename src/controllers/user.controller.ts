import { Request, Response } from 'express';
import User from '../models/user.model';
import asyncHandler from '../utils/asyncHandler';
import { ApiError } from '../errors/apiError';
import { getUsersList } from './user.service';
import { successResponse } from '../utils/response';

// CREATE
export const createUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  }
);

// READ ALL
export const getUsers = asyncHandler(
  async (req: Request, res: Response) => {
    console.log('[getUsers Controller] Request received');
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const role = req.query.role as string | undefined;
    
    console.log('[getUsers Controller] Query params extracted:', { page, limit, role });

    const result = await getUsersList(page, limit, role);
    
    console.log('[getUsers Controller] Service returned result with', result.users.length, 'users');

    return successResponse(res, result, 'Users fetched successfully');
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