import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { ApiError } from '../errors/apiError';

const authorize =
  (...allowedRoles: Array<'ADMIN' | 'USER'>) =>
  (req: AuthRequest, _res: Response, next: NextFunction) => {
    console.log('[authorize] Checking authorization for roles:', allowedRoles);
    
    if (!req.user) {
      console.log('[authorize] User not found in request');
      throw new ApiError(403, 'Forbidden');
    }

    console.log('[authorize] User role:', req.user.role, '| Allowed roles:', allowedRoles);
    
    if (!allowedRoles.includes(req.user.role)) {
      console.log('[authorize] Access denied - user role', req.user.role, 'not in allowed roles');
      throw new ApiError(403, 'Forbidden');
    }
    
    console.log('[authorize] Access granted for user:', req.user.email, 'with role:', req.user.role);
    next();
  };

export default authorize;
