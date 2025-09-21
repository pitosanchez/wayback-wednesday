import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validateRequest = (schema: z.ZodSchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        res.status(400).json({
          error: "Validation failed",
          details: errors,
        });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };
};
