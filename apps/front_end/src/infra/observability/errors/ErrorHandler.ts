
import type { ILogger, LogContext } from "../interfaces/ILogger";
import type { ErrorContext } from "../types/ErrorContext";
import type { NormalizedError } from "../types/NormalizedError";
import { normalizeError } from "./normalizeError";
import { ErrorCount } from "./ErrorCount";

// ============================================================
// STEP 1: DEFINE OPTIONS FOR ERROR HANDLING
// ============================================================
// `context` provides additional information about where or why
// the error occurred.
// `level` determines whether the error is logged as a warning
// or as an error. If omitted, the default is "error".
export interface HandleErrorOptions {
  readonly context?: ErrorContext;
  readonly level?: "warn" | "error";
}

// ============================================================
// STEP 2: DEFINE THE ERROR HANDLER
// ============================================================
// ErrorHandler coordinates the error-handling lifecycle.
//
// It receives two dependencies:
// 1. ILogger: Writes log messages.
// 2. ErrorCount: Tracks how many times each error code occurs.
//
// These dependencies are injected through the constructor.
export class ErrorHandler {
  constructor(
    private readonly logger: ILogger,
    private readonly errorCount: ErrorCount,
  ) {}

  // ==========================================================
  // STEP 3: RECEIVE AN ERROR
  // ==========================================================
  // `error` is unknown because JavaScript can throw values
  // of different types, not just Error objects.
  //
  // `options` optionally supplies context and logging level.
  //
  // Returns a standardized NormalizedError to the caller.
  handle(
    error: unknown,
    options: HandleErrorOptions = {},
  ): NormalizedError {

    // ========================================================
    // STEP 4: NORMALIZE THE ERROR
    // ========================================================
    // Convert the incoming value into the application's
    // standard NormalizedError structure.
    //
    // Pass the optional context so the normalized error can
    // include relevant information about the failure.
    const normalized = normalizeError(error, {
      context: options.context,
    });

    // ========================================================
    // STEP 5: RECORD THE ERROR COUNT
    // ========================================================
    // Record one occurrence using the normalized error code.
    //
    // This lets the observability system track error frequency
    // by error code.
    this.errorCount.record(normalized.code);

    // ========================================================
    // STEP 6: BUILD THE STRUCTURED LOG CONTEXT
    // ========================================================
    // Collect useful details about the normalized error.
    //
    // The logger receives this context alongside the message,
    // making errors easier to investigate and filter.
    const logContext: LogContext = {
      errorCode: normalized.code,
      errorName: normalized.name,
      retryable: normalized.retryable,
      timestamp: normalized.timestamp,
      context: normalized.context,
      metadata: normalized.metadata,
      stack: normalized.stack,
    };

    // ========================================================
    // STEP 7: LOG THE ERROR AT THE SELECTED LEVEL
    // ========================================================
    // If the caller explicitly selects "warn", log a warning.
    // Otherwise, log the error using logger.error().
    //
    // The injected ILogger implementation decides where logs
    // go, such as the console or a logging service.
    if (options.level === "warn") {
      this.logger.warn(normalized.message, logContext);
    } else {
      this.logger.error(normalized.message, logContext);
    }

    // ========================================================
    // STEP 8: RETURN THE NORMALIZED ERROR
    // ========================================================
    // Return the standardized error so the calling module
    // can inspect its code, message, context, and other fields.
    //
    // IMPORTANT: This method does not throw the error again.
    return normalized;
  }
}
