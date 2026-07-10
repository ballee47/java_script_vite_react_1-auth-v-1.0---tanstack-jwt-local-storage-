import { StorageSetOptions } from "./StorageSetOptions";
import { StorageGetOptions } from "./StorageGetOptions";
import { StorageRemoveOptions } from "./StorageRemoveOptions";

export interface StorageAdapter {
    set<T>(
        key: string,
        value: T,
        options?: StorageSetOptions
    ): void;

    get<T>(
        key: string,
        options?: StorageGetOptions
    ): T | null;

    remove(
        key: string,
        options?: StorageRemoveOptions
    ): void;

    clear(): void;

    has(key: string): boolean;

    keys(): string[];

    size(): number;
}