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

export class StorageService implements IStorageService {

    constructor(
        private readonly adapter: IStorageAdapter,
        private readonly serializer: ISerializer,

        private readonly setValidator: StorageSetValidator,
        private readonly getValidator: StorageGetValidator,
        private readonly removeValidator: StorageRemoveValidator,

        private readonly recordFactory: StorageRecordFactory,
        private readonly schemaValidator: StorageSchemaValidator,
    ) {}

    /**
     * Store a value.
     */
    public set(
        key: string,
        value: unknown,
        options?: StorageSetOptions,
    ): void {

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
    }

    /**
     * Retrieve a value.
     */
    public get<T = unknown>(
    key: string,
    options?: StorageGetOptions,
): T | null {

    this.getValidator.validate(
        key,
        options,
    );

    const serializedValue = this.adapter.get(key);

    if (serializedValue === null) {
        return null;
    }

    const schema =
        this.serializer.deserialize<StorageSchema<T>>(
            serializedValue,
        );

    this.schemaValidator.validate(schema);

    return schema.value;
}

    /**
     * Check whether a key exists.
     */
    public has(
        key: string,
    ): boolean {

        this.getValidator.validate(key);

        return this.adapter.has(key);
    }

    /**
     * Remove a value.
     */
    public remove(
        key: string,
        options?: StorageRemoveOptions,
    ): void {

        this.removeValidator.validate(
            key,
            options,
        );

        this.adapter.remove(key);
    }

    /**
     * Remove all stored values.
     */
    public clear(): void {
        this.adapter.clear();
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