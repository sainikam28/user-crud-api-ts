import { Router } from 'express';
import {
  getUsers,
  createUserHandler,
  getUserByIdHandler,
  deleteUserHandler,
  updateUserHandler
} from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';
import authorize from '../middlewares/role.middleware';

const router = Router();

router.post(
  '/',
  authMiddleware,
  authorize('ADMIN'),
  createUserHandler
);
router.get(
    '/', 
    authMiddleware, 
    authorize('ADMIN'), 
    getUsers
);
router.get(
  '/:id',
  authMiddleware,
  getUserByIdHandler
);
router.put(
  '/:id',
  authMiddleware,
  updateUserHandler
);
router.delete(
  '/:id',
  authMiddleware,
  authorize('ADMIN'),
  deleteUserHandler
);
// Used JWT-based authentication and a role-based authorization middleware that checks allowed roles before executing the controller

export default router;
