import { KeyValidator } from "./KeyValidator";



export class StorageGetValidator {
    constructor( private readonly KeyValidator : KeyValidator){}

    /**
     * Validates a storage get operation.
     */     

    public validate(key : unknown) : void {

     this.KeyValidator.validate(key);

    }


}