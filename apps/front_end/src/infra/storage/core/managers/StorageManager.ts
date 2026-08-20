import type { IStorageManager } from "../managers/interfaces/IStorageManager";
import type { StorageFacade } from "../facade/StorageFacade";

import {
    StorageAlreadyRegisteredError,
    StorageNotFoundError,
} from "../managers/errors/StorageManagerErrors";

export class StorageManager implements IStorageManager {

    private readonly storages = new Map<
        string,
        StorageFacade
    >();

    /**
     * Register a storage instance.
     */
    public register(
        name: string,
        storage: StorageFacade,
    ): void {

        if (this.storages.has(name)) {
            throw new StorageAlreadyRegisteredError(name);
        }

        this.storages.set(name, storage);
    }

    /**
     * Retrieve a registered storage instance.
     */
    public get(
        name: string,
    ): StorageFacade {

        const storage = this.storages.get(name);

        if (!storage) {
            throw new StorageNotFoundError(name);
        }

        return storage;
    }

    /**
     * Check whether a storage is registered.
     */
    public has(
        name: string,
    ): boolean {
        return this.storages.has(name);
    }

    /**
     * Remove a registered storage.
     */
    public remove(
        name: string,
    ): boolean {
        return this.storages.delete(name);
    }

    /**
     * Remove all registered storages.
     */
    public clear(): void {
        this.storages.clear();
    }

    /**
     * Return all registered storage names.
     */
    public names(): readonly string[] {
        return Array.from(this.storages.keys());
    }
}