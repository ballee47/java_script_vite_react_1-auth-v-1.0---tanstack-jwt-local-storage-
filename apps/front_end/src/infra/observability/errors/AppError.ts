
import type { ErrorCode } from "../types/ErrorCode";
import type { ErrorContext } from "../types/ErrorContext";

export interface AppErrorOptions {
  readonly code: ErrorCode;
  readonly message: string;
  readonly context?: ErrorContext;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly cause?: unknown;
  readonly retryable?: boolean;
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly context?: ErrorContext;
  public readonly metadata?: Readonly<Record<string, unknown>>;
  public readonly retryable: boolean;

  constructor(options: AppErrorOptions) {
    super(options.message, { cause: options.cause });

    this.name = "AppError";
    this.code = options.code;
    this.context = options.context;
    this.metadata = options.metadata;
    this.retryable = options.retryable ?? false;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

