// core/factories/StorageRecordFactory.ts

import type { StorageSchema } from "../../schemas/StorageSchema";
import type { StorageSetOptions } from "../../types";

export class StorageRecordFactory {

    public create<T>(
        key: string,
        value: T,
        options?: StorageSetOptions,
    ): StorageSchema<T> {

        const now = Date.now();

        return {
            key,
            value,
            createdAt: now,
            updatedAt: now,
            expiresAt: null,
            version: 1,
            metadata: undefined,
        };
    }
}