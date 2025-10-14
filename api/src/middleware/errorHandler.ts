import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger.js';
import { env } from '../lib/env.js';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error('Unhandled error', err);

  // Don't leak error details in production
  const isDevelopment = env.NODE_ENV === 'development';

  res.status(500).json({
    ok: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: isDevelopment ? err.message : 'An unexpected error occurred',
    ...(isDevelopment && { stack: err.stack })
  });
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({
    ok: false,
    error: 'NOT_FOUND',
    message: 'Route not found'
  });
}
