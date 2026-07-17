import { DefaultStorageValidator } from "./DefaultStorageValidator";

export class ValueValidator extends DefaultStorageValidator {

  public validate(value: unknown): void {
    this.validateRequired(value);
    this.validateType(value);
  }

  /**
   * Ensures a value has been provided.
   */
  private validateRequired(value: unknown): void {
    if (!this.isRequired(value)) {
      throw new Error("Storage value is required.");
    }
  }

  /**
   * Ensures the value is a supported storage type.
   */
  private validateType(
    value: unknown
  ): asserts value is string | number | boolean | Record<string, unknown> | unknown[] {

    if (
      !this.isString(value) &&
      !this.isNumber(value) &&
      !this.isBoolean(value) &&
      !this.isObject(value) &&
      !this.isArray(value)
    ) {
      throw new Error(
        "Storage value must be a string, number, boolean, object, or array."
      );
    }
  }

}