import { Request, Response } from 'express';
import User from '../models/user.model';
import asyncHandler from '../utils/asyncHandler';
import { ApiError } from '../errors/apiError';
import { createUser, deleteUser, getUserById, getUsersList, updateUser } from '../services/user.service';
import { successResponse } from '../utils/response';
import { AuthRequest } from '../middlewares/auth.middleware';

// CREATE
export const createUserHandler = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const user = await createUser(name, email, password, role);

  return successResponse(res, user, 'User created successfully', 201);
};

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
export const getUserByIdHandler = async (req: AuthRequest, res: Response) => {
  console.log('[getUserByIdHandler] Fetching user:', req.params.id);
  
  const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  
  const user = await getUserById(userId, {
    id: req.user!.id,
    role: req.user!.role
  });

  console.log('[getUserByIdHandler] User fetched successfully:', user._id);
  return successResponse(res, user, 'User fetched successfully');
};


// UPDATE
export const updateUserHandler = async (req: AuthRequest, res: Response) => {
  console.log('[updateUserHandler] Updating user:', req.params.id);
  
  const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  
  const updated = await updateUser(
    userId,
    req.body,
    { id: req.user!.id, role: req.user!.role }
  );

  console.log('[updateUserHandler] User updated successfully:', userId);
  return successResponse(res, updated, 'User updated successfully');
};

// DELETE
export const deleteUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    console.log('[deleteUserHandler] Deleting user:', req.params.id);
    
    const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    
    await deleteUser(userId);
    
    console.log('[deleteUserHandler] User deleted successfully:', userId);
    return successResponse(res, null, 'User deleted successfully');
  }
);
// (Must Know)  
// 🧠 Controller Design Principles

// No DB connection logic

// No response formatting logic

// Only request → action → response