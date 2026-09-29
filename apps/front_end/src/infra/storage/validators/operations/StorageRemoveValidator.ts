import { StorageRemoveOptions } from "../../types";
import { KeyValidator } from "../primitives/KeyValidator";

export class StorageRemoveValidator {
    constructor(private readonly keyValidator: KeyValidator) {}

    /**
     * Validates a storage remove operation.
     */ 
    public validate(key: unknown , _options?: StorageRemoveOptions): void {
        this.keyValidator.validate(key);
        void _options;
        
    }

}
