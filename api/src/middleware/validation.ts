import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * Generic validation middleware factory
 * Usage: router.post('/route', validate(MySchema), handler)
 */
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        error: 'VALIDATION_ERROR',
        details: result.error.flatten()
      });
    }

    // Attach validated data to request
    req.body = result.data;
    next();
  };
}
