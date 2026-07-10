import { StorageSchema } from "./StorageSchema";
import { StorageSetOptions } from "./StorageSetOptions";

/**
 * Defines validation rules for storage operations.
 */
export interface StorageValidator {
  /**
   * Validates a storage key.
   *
   * @param key - Storage key.
   */
  validateKey(key: string): void;

  /**
   * Validates a value before storage.
   *
   * @param value - Value to validate.
   */
  validateValue<T>(value: T): void;

  /**
   * Validates storage options.
   *
   * @param options - Storage options.
   */
  validateOptions(options?: StorageSetOptions): void;

  /**
   * Validates a complete storage schema.
   *
   * @param schema - Storage schema.
   */
  validateSchema<T>(schema: StorageSchema<T>): void;
}