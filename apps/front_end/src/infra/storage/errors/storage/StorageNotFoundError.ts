import { StorageError } from "../base";

export class StorageNotFoundError extends StorageError {
  constructor(
    message = "Storage was not found",
    options?: {
      operation?: string;
      cause?: unknown;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message, {
      code: "STORAGE_NOT_FOUND",
      operation: options?.operation,
      cause: options?.cause,
      metadata: options?.metadata,
    });

    this.name = "StorageNotFoundError";
  }
}