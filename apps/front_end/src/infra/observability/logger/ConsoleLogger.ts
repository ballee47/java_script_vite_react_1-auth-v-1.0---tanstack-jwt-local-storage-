import type { ILogger } from "../interfaces/ILogger";
import type { LogContext } from "./LogContext";
import type { LoggerConfig } from "./LoggerConfig";

import { DEFAULT_LOGGER_CONFIG } from "./LoggerConfig";
import { LOG_LEVEL_PRIORITY } from "./LogLevel";
import type { LogLevel } from "./LogLevel";

export class ConsoleLogger implements ILogger {
  private readonly config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      ...DEFAULT_LOGGER_CONFIG,
      ...config,
    };
  }

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
    level: LogLevel,
    message: string,
    context?: LogContext,
  ): void {
    if (!this.config.enabled) return;

    if (
      LOG_LEVEL_PRIORITY[level] <
      LOG_LEVEL_PRIORITY[this.config.minLevel]
    ) {
      return;
    }

    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      appName: this.config.appName,
      environment: this.config.environment,
      ...(context ? { context } : {}),
    };

    const output = JSON.stringify(entry);

    switch (level) {
      case "debug":
        console.debug(output);
        break;
      case "info":
        console.info(output);
        break;
      case "warn":
        console.warn(output);
        break;
      case "error":
        console.error(output);
        break;
    }
  }
}