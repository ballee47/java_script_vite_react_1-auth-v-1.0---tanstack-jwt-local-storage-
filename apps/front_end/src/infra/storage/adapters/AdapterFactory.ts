import type { IStorageAdapter } from "../interfaces/IStorageAdapter";

import type { StorageFactoryOptions } from "../types";
import { StorageType } from "../types";

import { LocalStorageAdapter } from "./LocalStorageAdapter/LocalStorageAdapter";
import { SessionStorageAdapter } from "./SessionStorageAdapter";
import { MemoryStorageAdapter } from "./MemoryStorageAdapter/MemoryStorageAdapter";
import { CookieStorageAdapter } from "./CookieStorageAdapter";

export class AdapterFactory {
    private constructor() {}

    public static create(
        options: StorageFactoryOptions,
    ): IStorageAdapter {
        switch (options.type) {
            case StorageType.LOCAL:
                return new LocalStorageAdapter(
                    options.namespace,
                );

            case StorageType.SESSION:
                return new SessionStorageAdapter(
                    options.namespace,
                );

            case StorageType.MEMORY:
                return new MemoryStorageAdapter(
                    options.namespace,
                );

            case StorageType.COOKIE:
                return new CookieStorageAdapter(
                    options.namespace,
                );

            default:
                return AdapterFactory.unreachable(
                    options.type,
                );
        }
    }

    private static unreachable(
        value: never,
    ): never {
        throw new Error(
            `Unsupported storage type: ${String(value)}`,
        );
    }
}