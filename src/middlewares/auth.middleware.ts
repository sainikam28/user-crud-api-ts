import { Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/jwt';
import { ApiError } from '../errors/apiError';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.log('[authMiddleware] Verifying token...');
  
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('[authMiddleware] Authorization header missing or invalid');
    throw new ApiError(401, 'Unauthorized');
  }

  const token = authHeader.split(' ')[1];
  console.log('[authMiddleware] Token extracted');

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    console.log('[authMiddleware] Token verified successfully for user:', decoded.email);
    next();
  } catch (error) {
    console.log('[authMiddleware] Token verification failed:', (error as Error).message);
    throw new ApiError(401, 'Invalid token');
  }
};

export default authMiddleware;
