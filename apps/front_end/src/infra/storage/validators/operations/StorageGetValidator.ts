import { StorageGetOptions } from "../../types";
import { KeyValidator } from "../primitives/KeyValidator";


export class StorageGetValidator {
    constructor( private readonly KeyValidator : KeyValidator){}

    /**
     * Validates a storage get operation.
     */     

    public validate(key : unknown , _options?: StorageGetOptions) : void {

     this.KeyValidator.validate(key);
     void _options;

    }


}
