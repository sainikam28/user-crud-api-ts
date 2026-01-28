import jwt from 'jsonwebtoken';
import { ApiError } from '../errors/apiError';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new ApiError(500, 'JWT_SECRET is not defined in environment variables');
}
const JWT_EXPIRES_IN = '1h';

export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
