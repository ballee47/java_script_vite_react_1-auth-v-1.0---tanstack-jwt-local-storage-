// bootstrap/storage.ts

import { StorageFactory } from "@/infra/storage/core/factories/StorageFactory";
import { StorageManager } from "@/infra/storage/core/managers/StorageManager";
import { StorageRegistry } from "@/infra/storage/core/registry/StorageRegistry";
import { StorageType } from "@/infra/storage/types";


const authStorage = StorageFactory.create({
    type: StorageType.COOKIE,
    namespace: "auth",
});

const appStorage = StorageFactory.create({
    type: StorageType.LOCAL,
    namespace: "app",
});

const cacheStorage = StorageFactory.create({
    type: StorageType.MEMORY,
    namespace: "cache",
});

const manager = new StorageManager();

manager.register("auth", authStorage);
manager.register("app", appStorage);
manager.register("cache", cacheStorage);

export const storage = new StorageRegistry(
    manager.get("auth"),
    manager.get("app"),
    manager.get("cache"),
);