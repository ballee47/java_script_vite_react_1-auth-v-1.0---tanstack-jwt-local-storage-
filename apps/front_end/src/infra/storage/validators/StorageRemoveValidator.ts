import { StorageRemoveOptions } from "../types";
import { KeyValidator } from "./KeyValidator";

export class StorageRemoveValidator {
    constructor(private readonly keyValidator: KeyValidator) {}

    /**
     * Validates a storage remove operation.
     */ 
    public validate(key: unknown , options?: StorageRemoveOptions): void {
        this.keyValidator.validate(key);
        
    }

}