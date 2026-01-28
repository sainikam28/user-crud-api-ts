import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';
import authorize from '../middlewares/role.middleware';

const router = Router();

router.post('/', createUser);
router.get('/', authMiddleware, authorize('ADMIN'), getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
// Used JWT-based authentication and a role-based authorization middleware that checks allowed roles before executing the controller

export default router;
