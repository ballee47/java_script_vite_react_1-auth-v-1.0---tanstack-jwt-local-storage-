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

import { StorageRecordFactory } from "./StorageRecordFactory";
import { StorageSchemaValidator } from "../../validators/core/StorageSchemaValidator";

// Observability
import { ConsoleStorageLogger } from "../../observability/logger/implementations/ConsoleStorageLogger";
import { InMemoryStorageMetrics } from "../../observability/metrics/implementations/InMemoryStorageMetrics";
import { ConsoleStorageTracer } from "../../observability/tracer/implementations/ConsoleStorageTracer";


export class StorageFactory {
    private constructor() {}

    public static create(
        options: StorageFactoryOptions,
    ): StorageFacade {

        // ============================================================
        // 1. Create the storage adapter
        // ============================================================

        const adapter = AdapterFactory.create(options);


        // ============================================================
        // 2. Create the serializer
        // ============================================================

        const serializer = new JsonSerializer();


        // ============================================================
        // 3. Create shared validator dependencies
        // ============================================================

        const keyValidator = new KeyValidator();

        const valueValidator = new ValueValidator();

        const optionsValidator = new StorageOptionsValidator();


        // ============================================================
        // 4. Create the schema validator
        // ============================================================

        const schemaValidator = new StorageSchemaValidator(
            keyValidator,
            valueValidator,
        );


        // ============================================================
        // 5. Create the storage record factory
        // ============================================================

        const recordFactory = new StorageRecordFactory();


        // ============================================================
        // 6. Create the set validator
        // ============================================================

        const setValidator = new StorageSetValidator(
            keyValidator,
            valueValidator,
            optionsValidator,
        );


        // ============================================================
        // 7. Create the get validator
        // ============================================================

        const getValidator = new StorageGetValidator(
            keyValidator,
        );


        // ============================================================
        // 8. Create the remove validator
        // ============================================================

        const removeValidator = new StorageRemoveValidator(
            keyValidator,
        );


        // ============================================================
        // 9. Create observability dependencies
        // ============================================================

        const logger = new ConsoleStorageLogger();

        const metrics = new InMemoryStorageMetrics();

        const tracer = new ConsoleStorageTracer();


        // ============================================================
        // 10. Create the storage service
        // ============================================================

        const service = new StorageService(
            adapter,
            serializer,

            setValidator,
            getValidator,
            removeValidator,

            recordFactory,
            schemaValidator,

            logger,
            metrics,
            tracer,
        );


        // ============================================================
        // 11. Create the public facade
        // ============================================================

        return new StorageFacade(service);
    }
}