import app from './app.js';
import { env } from './lib/env.js';
import { logger } from './lib/logger.js';

const PORT = Number(env.PORT);

// Start server
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server started on port ${PORT}`);
  logger.info(`📍 Environment: ${env.NODE_ENV}`);
  logger.info(`🌐 Frontend URL: ${env.FRONTEND_URL}`);
  logger.info(`🔒 CORS enabled`);
  logger.info(`⚡ Rate limiting active: 100 req/15min`);
  logger.info(`📧 Email configured: ${env.EMAIL_FROM}`);
  
  if (env.NODE_ENV === 'development') {
    logger.info(`\n🧪 Test endpoints:`);
    logger.info(`   Health: http://localhost:${PORT}/api/health`);
    logger.info(`   Contact: POST http://localhost:${PORT}/api/contact`);
    logger.info(`   Checkout: POST http://localhost:${PORT}/api/checkout/session`);
    logger.info(`   Events: GET http://localhost:${PORT}/api/events`);
    logger.info(`   Bookings: POST http://localhost:${PORT}/api/bookings\n`);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

