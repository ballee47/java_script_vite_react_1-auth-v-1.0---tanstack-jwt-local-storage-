import { StorageError } from "../base";

export class StorageKeyInvalidError extends StorageError {
  constructor(
    message = "Storage key is invalid",
    options?: {
      operation?: string;
      cause?: unknown;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message, {
      code: "STORAGE_KEY_INVALID",
      operation: options?.operation,
      cause: options?.cause,
      metadata: options?.metadata,
    });

    this.name = "StorageKeyInvalidError";
  }
}