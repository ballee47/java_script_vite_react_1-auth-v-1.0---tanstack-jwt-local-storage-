import { KeyValidator } from "../primitives/KeyValidator";
import { ValueValidator } from "../primitives/ValueValidator";
import { StorageOptionsValidator } from "../options/StorageOptionsValidator";
import type { StorageSetOptions } from "../../types";

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