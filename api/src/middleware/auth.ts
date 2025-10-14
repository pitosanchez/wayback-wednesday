import { Request, Response, NextFunction } from 'express';
import { verifyUserToken } from '../lib/supabase.js';
import { logger } from '../lib/logger.js';

/**
 * Middleware to verify Supabase JWT tokens
 * Add this to routes that require authentication
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        ok: false,
        error: 'UNAUTHORIZED',
        message: 'Missing or invalid authorization header'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const user = await verifyUserToken(token);

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: 'INVALID_TOKEN',
        message: 'Invalid or expired token'
      });
    }

    // Attach user to request object
    (req as any).user = user;
    
    next();
  } catch (error) {
    logger.error('Auth middleware error', error);
    res.status(500).json({
      ok: false,
      error: 'AUTH_ERROR',
      message: 'Authentication failed'
    });
  }
}

/**
 * Middleware for admin-only routes
 * Check if user has admin role (implement based on your needs)
 */
export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: 'UNAUTHORIZED',
        message: 'Authentication required'
      });
    }

    // TODO: Check if user has admin role
    // For now, you could check user metadata or a separate admins table
    // Example: if (user.app_metadata?.role !== 'admin') { return res.status(403)... }

    next();
  } catch (error) {
    logger.error('Admin middleware error', error);
    res.status(500).json({ ok: false, error: 'AUTH_ERROR' });
  }
}
