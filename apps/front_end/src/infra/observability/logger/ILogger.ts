import type { LogContext } from "../logger/LogContext";
import type { LogLevel } from "../logger/LogLevel";

export type { LogContext, LogLevel };

export interface ILogger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
}