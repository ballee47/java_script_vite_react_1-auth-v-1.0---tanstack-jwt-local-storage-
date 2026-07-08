import { StorageError } from "../errors/StorageError";

export function safeStringify<T>(value: T): string {
  try {
    return JSON.stringify(value);
  } catch {
    throw new StorageError("Failed to serialize value.");
  }
}