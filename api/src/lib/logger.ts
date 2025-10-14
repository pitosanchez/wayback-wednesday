import { env } from './env.js';

const isDevelopment = env.NODE_ENV === 'development';

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    if (isDevelopment) {
      console.log(`ℹ️  ${message}`, meta || '');
    } else {
      console.log(JSON.stringify({ level: 'info', message, ...meta, timestamp: new Date().toISOString() }));
    }
  },
  
  error: (message: string, error?: Error | unknown, meta?: Record<string, unknown>) => {
    if (isDevelopment) {
      console.error(`❌ ${message}`, error, meta || '');
    } else {
      console.error(JSON.stringify({
        level: 'error',
        message,
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack
        } : error,
        ...meta,
        timestamp: new Date().toISOString()
      }));
    }
  },
  
  warn: (message: string, meta?: Record<string, unknown>) => {
    if (isDevelopment) {
      console.warn(`⚠️  ${message}`, meta || '');
    } else {
      console.warn(JSON.stringify({ level: 'warn', message, ...meta, timestamp: new Date().toISOString() }));
    }
  },
  
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (isDevelopment) {
      console.log(`🐛 ${message}`, meta || '');
    }
  }
};

