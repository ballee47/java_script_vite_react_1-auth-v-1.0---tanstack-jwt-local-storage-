// core/registry/StorageRegistry.ts

import { StorageFacade } from "../facade/StorageFacade";

export class StorageRegistry {
    constructor(
        public readonly auth: StorageFacade,
        public readonly app: StorageFacade,
        public readonly cache: StorageFacade,
    ) {}
}