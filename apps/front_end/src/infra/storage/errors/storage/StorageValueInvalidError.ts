import { StorageError } from "../base";

export class StorageValueInvalidError extends StorageError {
  constructor(
    message = "Storage value is invalid",
    options?: {
      operation?: string;
      cause?: unknown;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message, {
      code: "STORAGE_VALUE_INVALID",
      operation: options?.operation,
      cause: options?.cause,
      metadata: options?.metadata,
    });

    this.name = "StorageValueInvalidError";
  }
}