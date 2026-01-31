import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/apiError';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  console.error('Unhandled Error:', err);

  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};

export default errorHandler;

// Controller throws error
//         ↓
// asyncHandler catches
//         ↓
// next(err)
//         ↓
// errorMiddleware
