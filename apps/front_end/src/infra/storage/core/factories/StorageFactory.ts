// core/factories/StorageFactory.ts

import { AdapterFactory } from "../../adapters/AdapterFactory";

import { JsonSerializer } from "../../serializers/JsonSerializer";

import {
    KeyValidator,
    ValueValidator,
    StorageOptionsValidator,
    StorageSetValidator,
    StorageGetValidator,
    StorageRemoveValidator,
} from "../../validators";

import { StorageService } from "../services";
import { StorageFacade } from "../facade/StorageFacade";

import type { StorageFactoryOptions } from "../../types";

export class StorageFactory {
    private constructor() {}

    public static create(
        options: StorageFactoryOptions,
    ): StorageFacade {

        // 1. Create the storage adapter
        const adapter = AdapterFactory.create(options);

        // 2. Create the serializer
        const serializer = new JsonSerializer();

        // 3. Create shared validator dependencies
        const keyValidator = new KeyValidator();
        const valueValidator = new ValueValidator();
        const optionsValidator = new StorageOptionsValidator();

        // 4. Create the set validator
        const setValidator = new StorageSetValidator(
            keyValidator,
            valueValidator,
            optionsValidator,
        );

        // 5. Create the get validator
        const getValidator = new StorageGetValidator(
            keyValidator,
        );

        // 6. Create the remove validator
        const removeValidator = new StorageRemoveValidator(
            keyValidator,
        );

        // 7. Create the storage service
        const service = new StorageService(
            adapter,
            serializer,
            setValidator,
            getValidator,
            removeValidator,
        );

        // 8. Create the public facade
        return new StorageFacade(service);
    }
}