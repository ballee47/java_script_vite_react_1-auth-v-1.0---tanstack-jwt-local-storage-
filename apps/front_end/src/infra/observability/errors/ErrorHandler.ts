
import type { ILogger, LogContext } from "../interfaces/ILogger";
import type { ErrorContext } from "../types/ErrorContext";
import type { NormalizedError } from "../types/NormalizedError";
import { normalizeError } from "./normalizeError";

export interface HandleErrorOptions {
  readonly context?: ErrorContext;
  readonly level?: "warn" | "error";
}

export class ErrorHandler {
  constructor(private readonly logger: ILogger) {}

  handle(
    error: unknown,
    options: HandleErrorOptions = {},
  ): NormalizedError {
    const normalized = normalizeError(error, {
      context: options.context,
    });

    const logContext: LogContext = {
      errorCode: normalized.code,
      errorName: normalized.name,
      retryable: normalized.retryable,
      timestamp: normalized.timestamp,
      context: normalized.context,
      metadata: normalized.metadata,
      stack: normalized.stack,
    };

    if (options.level === "warn") {
      this.logger.warn(normalized.message, logContext);
    } else {
      this.logger.error(normalized.message, logContext);
    }

    return normalized;
  }
}