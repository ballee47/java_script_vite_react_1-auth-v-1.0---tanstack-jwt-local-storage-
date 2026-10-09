
import type {
  ILogger,
  LogContext,
} from "../interfaces/ILogger";

export class ConsoleLogger implements ILogger {
  debug(message: string, context?: LogContext): void {
    this.write("debug", message, context);
  }

  info(message: string, context?: LogContext): void {
    this.write("info", message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.write("warn", message, context);
  }

  error(message: string, context?: LogContext): void {
    this.write("error", message, context);
  }

  private write(
    level: "debug" | "info" | "warn" | "error",
    message: string,
    context?: LogContext,
  ): void {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context ? { context } : {}),
    };

    switch (level) {
      case "debug":
        console.debug(entry);
        break;

      case "info":
        console.info(entry);
        break;

      case "warn":
        console.warn(entry);
        break;

      case "error":
        console.error(entry);
        break;
    }
  }
}