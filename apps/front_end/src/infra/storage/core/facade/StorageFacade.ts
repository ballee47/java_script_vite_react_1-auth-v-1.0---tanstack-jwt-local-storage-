
import {StorageService} from "..//services";


import type {
    StorageGetOptions,
    StorageRemoveOptions,
    StorageSetOptions,
} from "../../types";

export class Storage {
    constructor(
        private readonly service: StorageService,
    ) {}

    /**
     * Store a value.
     */
    public set(
        key: string,
        value: unknown,
        options?: StorageSetOptions,
    ): void {
        this.service.set(key, value, options);
    }

    /**
     * Retrieve a value.
     */
    public get<T = unknown>(
        key: string,
        options?: StorageGetOptions,
    ): T | null {
        return this.service.get<T>(key, options);
    }

    /**
     * Check if a key exists.
     */
    public has(key: string): boolean {
        return this.service.has(key);
    }

    /**
     * Remove a single key.
     */
    public remove(
        key: string,
        options?: StorageRemoveOptions,
    ): void {
        this.service.remove(key, options);
    }

    /**
     * Remove every stored value.
     */
    public clear(): void {
        this.service.clear();
    }

    /**
     * Return all keys.
     */
    public keys(): readonly string[] {
        return this.service.keys();
    }

    /**
     * Number of stored items.
     */
    public size(): number {
        return this.service.size();
    }

    /**
     * Storage availability.
     */
    public isAvailable(): boolean {
        return this.service.isAvailable();
    }
}