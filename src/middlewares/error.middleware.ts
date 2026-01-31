import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/apiError';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    console.log('[errorHandler] ApiError caught:', {
      statusCode: err.statusCode,
      message: err.message,
      isOperational: err.isOperational
    });
    
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  console.error('[errorHandler] Unhandled Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack
  });

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
