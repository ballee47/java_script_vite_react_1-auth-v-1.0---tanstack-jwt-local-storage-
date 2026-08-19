// core/services/StorageService.ts

import type { IStorageService } from "../../core/services/interfaces/IStorageService";
import type { IStorageAdapter } from "../../interfaces/IStorageAdapter";
import type { ISerializer } from "../../serializers/interfaces/ISerializer";

import {
    StorageGetValidator,
    StorageRemoveValidator,
    StorageSetValidator,
} from "../../validators";

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
    ) {}

    /**
     * Store a value.
     */
    public set(
        key: string,
        value: unknown,
        options?: StorageSetOptions,
    ): void {

        this.setValidator.validate(
            key,
            value,
            options,
        );

        const serializedValue = this.serializer.serialize(value);

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

        const value = this.adapter.get(key);

        if (value === null) {
            return null;
        }

        return this.serializer.deserialize<T>(value);
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