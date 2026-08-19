// core/services/interfaces/IStorageService.ts

import type {
    StorageGetOptions,
    StorageRemoveOptions,
    StorageSetOptions,
} from "../../../types";

export interface IStorageService {

    /**
     * Stores a value.
     */
    set(
        key: string,
        value: unknown,
        options?: StorageSetOptions,
    ): void;

    /**
     * Retrieves a stored value.
     */
    get<T = unknown>(
        key: string,
        options?: StorageGetOptions,
    ): T | null;

    /**
     * Checks whether a key exists.
     */
    has(
        key: string,
    ): boolean;

    /**
     * Removes a stored value.
     */
    remove(
        key: string,
        options?: StorageRemoveOptions,
    ): void;

    /**
     * Removes all stored values.
     */
    clear(): void;

    /**
     * Returns all stored keys.
     */
    keys(): readonly string[];

    /**
     * Returns the number of stored items.
     */
    size(): number;

    /**
     * Checks whether the underlying storage is available.
     */
    isAvailable(): boolean;
}