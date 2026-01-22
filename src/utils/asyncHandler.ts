import { Request, Response, NextFunction } from 'express';

const asyncHandler =
  (fn: Function) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
// Why this is important
// Without this:
// You must wrap every async route in try/catch
// Missed errors → unhandled promise rejection → app crash