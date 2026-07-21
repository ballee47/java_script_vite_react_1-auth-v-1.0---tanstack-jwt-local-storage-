import { KeyValidator } from "./KeyValidator";
import { ValueValidator } from "./ValueValidator";

export class StorageSetValidator {
  constructor(
    private readonly keyValidator: KeyValidator,
    private readonly valueValidator: ValueValidator
  ) {}

  /**
   * Validates a storage set operation.
   */
  public validate(key: unknown, value: unknown): void {
    this.keyValidator.validate(key);
    this.valueValidator.validate(value);
  }
}