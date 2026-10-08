// core/services/StorageService.ts

import type { IStorageService } from "../../core/services/interfaces/IStorageService";
import type { IStorageAdapter } from "../../interfaces/IStorageAdapter";
import type { ISerializer } from "../../serializers/interfaces/ISerializer";

import {
    StorageGetValidator,
    StorageRemoveValidator,
    StorageSchemaValidator,
    StorageSetValidator,
} from "../../validators";

import { StorageRecordFactory } from "../factories/StorageRecordFactory";

import type { StorageSchema } from "../../schemas/StorageSchema";

import type {
    StorageGetOptions,
    StorageRemoveOptions,
    StorageSetOptions,
} from "../../types";

import type { IStorageLogger } from "../../observability/logger/interfaces/IStorageLogger";
import type { IStorageMetrics } from "../../observability/metrics/interfaces/IStorageMetrics";
import type { IStorageTracer } from "../../observability/tracer/interfaces/IStorageTracer";

import { StorageReadError } from "../../errors/adapter";
import { StorageWriteError } from "../../errors/adapter";
import { StorageRemoveError } from "../../errors/adapter";

export class StorageService implements IStorageService {

    constructor(
        private readonly adapter: IStorageAdapter,
        private readonly serializer: ISerializer,

        private readonly setValidator: StorageSetValidator,
        private readonly getValidator: StorageGetValidator,
        private readonly removeValidator: StorageRemoveValidator,

        private readonly recordFactory: StorageRecordFactory,
        private readonly schemaValidator: StorageSchemaValidator,

        // Observability dependencies
        private readonly logger: IStorageLogger,
        private readonly metrics: IStorageMetrics,
        private readonly tracer: IStorageTracer,
    ) {}

    /**
     * Store a value.
     */
    public set(
        key: string,
        value: unknown,
        options?: StorageSetOptions,
    ): void {

        const trace = this.tracer.startTrace(
            "storage.set",
            {
                key,
            },
        );

        const startTime = Date.now();

        this.logger.debug(
            "Storage set started",
            {
                key,
            },
        );

        try {

            // 1. Validate public operation input.
            this.setValidator.validate(
                key,
                value,
                options,
            );

            // 2. Create the internal storage record.
            const schema = this.recordFactory.create(
                key,
                value,
                options,
            );

            // 3. Validate the complete internal record.
            this.schemaValidator.validate(schema);

            // 4. Serialize the complete storage record.
            const serializedValue = this.serializer.serialize(
                schema,
            );

            // 5. Persist the serialized record.
            this.adapter.set(
                key,
                serializedValue,
            );

            const duration = Date.now() - startTime;

            this.metrics.increment(
                "storage.set.success",
            );

            this.metrics.timing(
                "storage.set.duration",
                duration,
            );

            this.logger.info(
                "Storage set completed",
                {
                    key,
                    duration,
                },
            );

            this.tracer.endTrace(
                trace,
                "success",
            );

        } catch (error) {

            const duration = Date.now() - startTime;

            this.metrics.increment(
                "storage.set.error",
            );

            this.metrics.timing(
                "storage.set.duration",
                duration,
            );

            this.logger.error(
                error,
                
                {
                    key,
                    duration,
                },
            );

            this.tracer.endTrace(
                trace,
                "error",
                error,
            );

            throw new StorageWriteError(
                `Failed to write storage key "${key}".`,
                {
                    cause: error,
                    operation: "set",
                    metadata: {
                        key,
                    },
                },
            );
        }
    }

    /**
     * Retrieve a value.
     */
    public get<T = unknown>(
        key: string,
        options?: StorageGetOptions,
    ): T | null {

        const trace = this.tracer.startTrace(
            "storage.get",
            {
                key,
            },
        );

        const startTime = Date.now();

        this.logger.debug(
            "Storage get started",
            {
                key,
            },
        );

        try {

            this.getValidator.validate(
                key,
                options,
            );

            const serializedValue = this.adapter.get(
                key,
            );

            if (serializedValue === null) {

                const duration = Date.now() - startTime;

                this.metrics.increment(
                    "storage.get.miss",
                );

                this.metrics.timing(
                    "storage.get.duration",
                    duration,
                );

                this.logger.debug(
                    "Storage key not found",
                    {
                        key,
                        duration,
                    },
                );

                this.tracer.endTrace(
                    trace,
                    "success",
                );

                return null;
            }

            const schema =
                this.serializer.deserialize<StorageSchema<T>>(
                    serializedValue,
                );

            this.schemaValidator.validate(
                schema,
            );

            const duration = Date.now() - startTime;

            this.metrics.increment(
                "storage.get.success",
            );

            this.metrics.timing(
                "storage.get.duration",
                duration,
            );

            this.logger.info(
                "Storage get completed",
                {
                    key,
                    duration,
                },
            );

            this.tracer.endTrace(
                trace,
                "success",
            );

            return schema.value;

        } catch (error) {

            const duration = Date.now() - startTime;

            this.metrics.increment(
                "storage.get.error",
            );

            this.metrics.timing(
                "storage.get.duration",
                duration,
            );

            this.logger.error(
                error,
                {
                    key,
                    duration,
                },
            );

            this.tracer.endTrace(
                trace,
                "error",
                error,
            );

            throw new StorageReadError(
                `Failed to read storage key "${key}".`,
                {
                    cause: error,
                    operation: "get",
                    metadata: {
                        key,
                    },
                },
            );
        }
    }

    /**
     * Check whether a key exists.
     */
    public has(
        key: string,
    ): boolean {

        const trace = this.tracer.startTrace(
            "storage.has",
            {
                key,
            },
        );

        try {

            this.getValidator.validate(
                key,
            );

            const result = this.adapter.has(
                key,
            );

            this.metrics.increment(
                result
                    ? "storage.has.true"
                    : "storage.has.false",
            );

            this.tracer.endTrace(
                trace,
                "success",
            );

            return result;

        } catch (error) {

            this.metrics.increment(
                "storage.has.error",
            );

            this.logger.error(
                error,
                {
                    key,
                },
            );

            this.tracer.endTrace(
                trace,
                "error",
                error,
            );

            throw error;
        }
    }

    /**
     * Remove a value.
     */
    public remove(
        key: string,
        options?: StorageRemoveOptions,
    ): void {

        const trace = this.tracer.startTrace(
            "storage.remove",
            {
                key,
            },
        );

        const startTime = Date.now();

        try {

            this.removeValidator.validate(
                key,
                options,
            );

            this.adapter.remove(
                key,
            );

            const duration = Date.now() - startTime;

            this.metrics.increment(
                "storage.remove.success",
            );

            this.metrics.timing(
                "storage.remove.duration",
                duration,
            );

            this.logger.info(
                "Storage remove completed",
                {
                    key,
                    duration,
                },
            );

            this.tracer.endTrace(
                trace,
                "success",
            );

        } catch (error) {

            const duration = Date.now() - startTime;

            this.metrics.increment(
                "storage.remove.error",
            );

            this.metrics.timing(
                "storage.remove.duration",
                duration,
            );

            this.logger.error(
                error,
                {
                    key,
                    duration,
                },
            );

            this.tracer.endTrace(
                trace,
                "error",
                error,
            );

            throw new StorageRemoveError(
                `Failed to remove storage key "${key}".`,
                {
                    cause: error,
                    operation: "remove",
                    metadata: {
                        key,
                    },
                },
            );
        }
    }

    /**
     * Remove all stored values.
     */
    public clear(): void {

        const trace = this.tracer.startTrace(
            "storage.clear",
        );

        const startTime = Date.now();

        try {

            this.adapter.clear();

            const duration = Date.now() - startTime;

            this.metrics.increment(
                "storage.clear.success",
            );

            this.metrics.timing(
                "storage.clear.duration",
                duration,
            );

            this.logger.info(
                "Storage clear completed",
                {
                    duration,
                },
            );

            this.tracer.endTrace(
                trace,
                "success",
            );

        } catch (error) {

            this.metrics.increment(
                "storage.clear.error",
            );

            this.logger.error(
                error,
                undefined,
            );

            this.tracer.endTrace(
                trace,
                "error",
                error,
            );

            throw error;
        }
    }

    /**
     * Return all stored keys.
     */
    public keys(): readonly string[] {

        return this.adapter.keys();
    }

    /**
     * Return the total number of stored items.
     */
    public size(): number {

        return this.adapter.size();
    }

    /**
     * Check whether storage is available.
     */
    public isAvailable(): boolean {

        return this.adapter.isAvailable();
    }
}