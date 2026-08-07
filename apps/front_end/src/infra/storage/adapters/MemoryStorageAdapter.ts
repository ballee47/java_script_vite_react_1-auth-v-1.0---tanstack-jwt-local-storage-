import { BaseStorageAdapter } from "./BaseStorageAdapter";

import {
    IKeyValueStore,
    MapKeyValueStore
} from "../stores";

export class MemoryStorageAdapter extends BaseStorageAdapter {

    private readonly store: IKeyValueStore<string>;

    constructor(
        namespace: string = "",
        store: IKeyValueStore<string> = new MapKeyValueStore<string>()
    ) {
        super(namespace);

        this.store = store;
    }

    /**
     * Checks whether memory storage is available.
     */
    public override isAvailable(): boolean {
        return true;
    }

    /**
     * Stores a value.
     */
    public override set(
        key: string,
        value: string
    ): void {

        this.store.set(
            this.buildKey(key),
            value
        );

    }

    /**
     * Gets a stored value.
     */
    public override get(
        key: string
    ): string | null {

        return this.store.get(
            this.buildKey(key)
        ) ?? null;

    }

    /**
     * Removes a value.
     */
    public override remove(
        key: string
    ): void {

        this.store.remove(
            this.buildKey(key)
        );

    }

    /**
     * Clears all values inside the namespace.
     */
    public override clear(): void {

        for (const key of this.store.keys()) {

            if (
                this.namespace === "" ||
                key.startsWith(`${this.namespace}:`)
            ) {

                this.store.remove(key);

            }

        }

    }

    /**
     * Checks if a key exists.
     */
    public override has(
        key: string
    ): boolean {

        return this.store.has(
            this.buildKey(key)
        );

    }

    /**
     * Returns all keys within the namespace.
     */
    public override keys(): string[] {

        const prefix = this.namespace
            ? `${this.namespace}:`
            : "";

        return [...this.store.keys()]
            .filter(
                key =>
                    !prefix ||
                    key.startsWith(prefix)
            )
            .map(
                key =>
                    prefix
                        ? key.substring(prefix.length)
                        : key
            );

    }

    size(): number {

        const prefix = this.namespace
            ? `${this.namespace}:`
            : "";
        return [...this.store.keys()].filter(key => !prefix || key.startsWith(prefix)).length;
    }
}