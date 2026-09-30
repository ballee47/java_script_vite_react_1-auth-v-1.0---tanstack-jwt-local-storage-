import { StorageError } from "../base";

export class StorageSerializationError extends StorageError {
  constructor(
    message = "Failed to serialize storage value",
    options?: {
      operation?: string;
      cause?: unknown;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message, {
      code: "STORAGE_SERIALIZATION_FAILED",
      operation: options?.operation,
      cause: options?.cause,
      metadata: options?.metadata,
    });

    this.name = "StorageSerializationError";
  }
}