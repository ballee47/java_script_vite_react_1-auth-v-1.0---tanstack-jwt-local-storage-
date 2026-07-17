import { DefaultStorageValidator } from "./DefaultStorageValidator";
import { StorageLimits } from "../constants";

export class KeyValidator extends DefaultStorageValidator {

  public validate(key: unknown): void {
    this.validateRequired(key);
    this.validateType(key);
    this.validateLength(key);
    this.validateReserved(key);
  }

  /**
   * Ensures a key has been provided.
   */
  private validateRequired(key: unknown): void {
    if (!this.isRequired(key)) {
      throw new Error("Storage key is required.");
    }
  }

  /**
   * Ensures the key is a string.
   */
  private validateType(key: unknown): asserts key is string {
    if (!this.isString(key)) {
      throw new Error("Storage key must be a string.");
    }
  }

  /**
   * Validates the key length.
   */
  private validateLength(key: string): void {
    if (this.isEmpty(key)) {
      throw new Error("Storage key cannot be empty.");
    }

    if (this.belowMinLength(key, StorageLimits.MIN_KEY_LENGTH)) {
      throw new Error(
        `Storage key must be at least ${StorageLimits.MIN_KEY_LENGTH} characters long.`
      );
    }

    if (this.exceedsMaxLength(key, StorageLimits.MAX_KEY_LENGTH)) {
      throw new Error(
        `Storage key cannot exceed ${StorageLimits.MAX_KEY_LENGTH} characters.`
      );
    }
  }

  /**
   * Ensures reserved keys cannot be used.
   */
  private validateReserved(key: string): void {
    if (this.isReservedKey(key)) {
      throw new Error(
        `Storage key "${key}" is reserved and cannot be used.`
      );
    }
  }

  /**
   * Checks whether the key is reserved.
   */
  protected isReservedKey(key: string): boolean {
    const reservedKeys = [
      "__proto__",
      "prototype",
      "constructor",
    ];

    return reservedKeys.includes(key);
  }
}