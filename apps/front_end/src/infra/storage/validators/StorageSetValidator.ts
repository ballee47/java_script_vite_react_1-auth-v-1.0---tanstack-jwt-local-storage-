import { KeyValidator } from "./KeyValidator";
import { ValueValidator } from "./ValueValidator";
import { StorageOptionsValidator } from "./StorageOptionsValidator";
import type { StorageSetOptions } from "../types";

export class StorageSetValidator {
    constructor(
        private readonly keyValidator: KeyValidator,
        private readonly valueValidator: ValueValidator,
        private readonly optionsValidator: StorageOptionsValidator,
    ) {}

    /**
     * Validates a storage set operation.
     */
    public validate(
        key: unknown,
        value: unknown,
        options?: StorageSetOptions,
    ): void {
        this.keyValidator.validate(key);
        this.valueValidator.validate(value);
        this.optionsValidator.validate(options);
    }
}