/**
 * Base validator for the storage system.
 *
 * This class provides common validation utilities that can be
 * reused by all storage validators.
 *
 * Examples:
 * - StorageSetValidator
 * - StorageGetValidator
 * - StorageRemoveValidator
 */
export abstract class DefaultStorageValidator {
  /**
   * Checks whether a value exists.
   */
  protected isRequired(value: unknown): boolean {
    return value !== null && value !== undefined;
  }

  /**
   * Checks whether a value is a string.
   */
  protected isString(value: unknown): value is string {
    return typeof value === "string";
  }

  /**
   * Checks whether a value is a number.
   */
  protected isNumber(value: unknown): value is number {
    return typeof value === "number" && !Number.isNaN(value);
  }

  /**
   * Checks whether a value is a boolean.
   */
  protected isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
  }

  /**
   * Checks whether a value is an object.
   */
  protected isObject(value: unknown): value is Record<string, unknown> {
    return (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    );
  }

  /**
   * Checks whether a value is an array.
   */
  protected isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  /**
   * Checks whether a string is empty.
   */
  protected isEmpty(value: string): boolean {
    return value.trim().length === 0;
  }

  /**
   * Checks whether a string exceeds the maximum length.
   */
  protected exceedsMaxLength(value: string, max: number): boolean {
    return value.length > max;
  }

  /**
   * Checks whether a string is shorter than the minimum length.
   */
  protected belowMinLength(value: string, min: number): boolean {
    return value.length < min;
  }
}