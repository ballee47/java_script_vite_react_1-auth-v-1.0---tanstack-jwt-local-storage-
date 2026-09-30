import { StorageError } from "../base";

export class StorageDeserializationError extends StorageError {
  constructor(
    message = "Failed to deserialize storage value",
    options?: {
      operation?: string;
      cause?: unknown;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message, {
      code: "STORAGE_DESERIALIZATION_FAILED",
      operation: options?.operation,
      cause: options?.cause,
      metadata: options?.metadata,
    });

    this.name = "StorageDeserializationError";
  }
}