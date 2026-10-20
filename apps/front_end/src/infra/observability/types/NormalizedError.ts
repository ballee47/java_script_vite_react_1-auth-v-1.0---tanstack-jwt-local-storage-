
import type { ErrorCode } from "../errors/ErrorCode";
import type { ErrorContext } from "./ErrorContext";

export interface NormalizedError {
  readonly code: ErrorCode;
  readonly message: string;
  readonly name: string;
  readonly stack?: string;
  readonly context?: ErrorContext;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly retryable: boolean;
  readonly timestamp: number;
}
