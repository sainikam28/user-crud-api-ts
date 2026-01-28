import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { ApiError } from '../errors/apiError';

const authorize =
  (...allowedRoles: Array<'ADMIN' | 'USER'>) =>
  (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, 'Forbidden');
    }
    next();
  };

export default authorize;
