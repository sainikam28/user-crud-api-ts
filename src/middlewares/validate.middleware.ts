import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction) => {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });
    next();
  };

export default validate;
