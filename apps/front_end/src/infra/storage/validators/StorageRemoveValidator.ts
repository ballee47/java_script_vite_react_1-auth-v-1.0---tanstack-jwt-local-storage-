import { KeyValidator } from "./KeyValidator";

export class StorageRemoveValidator {
    constructor(private readonly keyValidator: KeyValidator) {}

    /**
     * Validates a storage remove operation.
     */ 
    public validate(key: unknown): void {
        this.keyValidator.validate(key);
        
    }

}