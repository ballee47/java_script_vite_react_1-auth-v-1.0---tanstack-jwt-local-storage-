
import type { ErrorCode } from "./ErrorCode";
import type { ErrorContext } from "./ErrorContext";

export interface NormalizedError {
  /**
   * Stable machine-readable error identifier.
   */
  readonly code: ErrorCode;

  /**
   * Human-readable diagnostic message.
   * Must not contain secrets or sensitive information.
   */
  readonly message: string;

  /**
   * Name of the original error type, when available.
   * Example: "TypeError", "AppError".
   */
  readonly name: string;

  /**
   * Stack trace for development diagnostics.
   * May be omitted from production-facing output.
   */
  readonly stack?: string;

  /**
   * Context describing where and during which operation
   * the error occurred.
   */
  readonly context?: ErrorContext;

  /**
   * Additional safe diagnostic details.
   */
  readonly metadata?: Readonly<Record<string, unknown>>;

  /**
   * Indicates whether the failure may be retried.
   * This is a hint, not a guarantee that retrying is safe.
   */
  readonly retryable: boolean;

  /**
   * Timestamp, in milliseconds since the Unix epoch,
   * when the normalized error was created.
   */
  readonly timestamp: number;
}

