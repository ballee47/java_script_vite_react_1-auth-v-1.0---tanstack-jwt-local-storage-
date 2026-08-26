import type {
    StorageGetOptions,
    StorageRemoveOptions,
    StorageSetOptions,
} from "../../../types";

export interface IStorageFacade {
    set(
        key: string,
        value: unknown,
        options?: StorageSetOptions,
    ): void;

    get<T = unknown>(
        key: string,
        options?: StorageGetOptions,
    ): T | null;

    has(key: string): boolean;

    remove(
        key: string,
        options?: StorageRemoveOptions,
    ): void;

    clear(): void;

    keys(): readonly string[];

    size(): number;

    isAvailable(): boolean;
}