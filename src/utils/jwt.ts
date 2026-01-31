import jwt from 'jsonwebtoken';
import { ApiError } from '../errors/apiError';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new ApiError(500, 'JWT_SECRET is not defined in environment variables');
}

const JWT_EXPIRES_IN = '1h';

/**
 * Shape of data stored inside JWT
*/
export interface TokenPayload {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

/**
 * Sign JWT
 */
export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

/**
 * Verify JWT
 */
export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};