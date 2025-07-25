// Logger utility
// In production, this would be replaced with a proper logging service
// like Sentry, LogRocket, or custom backend logging

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private log(level: LogLevel, message: string, context?: LogContext) {
    // In production, send to logging service
    // For now, only log in development
    if (!this.isDevelopment && level !== "error") {
      return;
    }

    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    switch (level) {
      case "debug":
        if (this.isDevelopment) {
          console.debug(formattedMessage, context);
        }
        break;
      case "info":
        if (this.isDevelopment) {
          console.log(formattedMessage, context);
        }
        break;
      case "warn":
        console.warn(formattedMessage, context);
        break;
      case "error":
        console.error(formattedMessage, context);
        // In production, this would also send to error tracking service
        break;
    }
  }

  debug(message: string, context?: LogContext) {
    this.log("debug", message, context);
  }

  info(message: string, context?: LogContext) {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log("warn", message, context);
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    const errorContext = {
      ...context,
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : error,
    };
    this.log("error", message, errorContext);
  }
}

export const logger = new Logger();
