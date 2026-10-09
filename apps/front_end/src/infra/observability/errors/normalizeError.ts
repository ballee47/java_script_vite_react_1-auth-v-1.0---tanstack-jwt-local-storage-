
import { ErrorCode } from "../types/ErrorCode";
import type { ErrorContext } from "../types/ErrorContext";
import type { NormalizedError } from "../types/NormalizedError";
import { AppError } from "./AppError";

export interface NormalizeErrorOptions {
  readonly context?: ErrorContext;
}

export function normalizeError(
  error: unknown,
  options: NormalizeErrorOptions = {},
): NormalizedError {
  const timestamp = Date.now();

  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      name: error.name,
      stack: error.stack,
      context: options.context ?? error.context,
      metadata: error.metadata,
      retryable: error.retryable,
      timestamp,
    };
  }

  if (error instanceof Error) {
    return {
      code: ErrorCode.UNKNOWN_ERROR,
      message: error.message || "An unexpected error occurred.",
      name: error.name || "Error",
      stack: error.stack,
      context: options.context,
      retryable: false,
      timestamp,
    };
  }

  return {
    code: ErrorCode.UNKNOWN_ERROR,
    message: "An unexpected error occurred.",
    name: "UnknownError",
    context: options.context,
    retryable: false,
    timestamp,
  };
}

