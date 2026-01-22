import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = res.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

export default errorMiddleware;
// Controller throws error
//         ↓
// asyncHandler catches
//         ↓
// next(err)
//         ↓
// errorMiddleware
