// validators/core/StorageSchemaValidator.ts

import type { StorageSchema } from "../../schemas/StorageSchema";

import { KeyValidator } from "../primitives/KeyValidator";
import { ValueValidator } from "../primitives/ValueValidator";

/**
 * Validates the complete internal storage record.
 *
 * Responsible for validating:
 * - key
 * - value
 * - createdAt
 * - updatedAt
 * - expiresAt
 * - version
 * - metadata
 */
export class StorageSchemaValidator {

    constructor(
        private readonly keyValidator: KeyValidator,
        private readonly valueValidator: ValueValidator,
    ) {}

    /**
     * Validates a complete storage schema.
     */
    public validate<T>(
        schema: StorageSchema<T>,
    ): void {

        this.validateSchemaObject(schema);

        this.keyValidator.validate(schema.key);

        this.valueValidator.validate(schema.value);

        this.validateCreatedAt(schema.createdAt);

        this.validateUpdatedAt(
            schema.updatedAt,
            schema.createdAt,
        );

        this.validateExpiresAt(
            schema.expiresAt,
            schema.createdAt,
        );

        this.validateVersion(schema.version);

        this.validateMetadata(schema.metadata);
    }

    /**
     * Validates that the schema itself is a valid object.
     */
    private validateSchemaObject(
        schema: unknown,
    ): asserts schema is StorageSchema {
        if (
            typeof schema !== "object" ||
            schema === null ||
            Array.isArray(schema)
        ) {
            throw new Error(
                "Storage schema must be a valid object.",
            );
        }
    }

    /**
     * Validates the creation timestamp.
     */
    private validateCreatedAt(
        timestamp: number,
    ): void {

        if (
            !Number.isFinite(timestamp) ||
            timestamp < 0
        ) {
            throw new Error(
                "Storage createdAt must be a valid timestamp.",
            );
        }
    }

    /**
     * Validates the last update timestamp.
     */
    private validateUpdatedAt(
        timestamp: number,
        createdAt: number,
    ): void {

        if (
            !Number.isFinite(timestamp) ||
            timestamp < 0
        ) {
            throw new Error(
                "Storage updatedAt must be a valid timestamp.",
            );
        }

        if (timestamp < createdAt) {
            throw new Error(
                "Storage updatedAt cannot be earlier than createdAt.",
            );
        }
    }

    /**
     * Validates the expiration timestamp.
     */
    private validateExpiresAt(
        timestamp: number | null,
        createdAt: number,
    ): void {

        if (timestamp === null) {
            return;
        }

        if (
            !Number.isFinite(timestamp) ||
            timestamp < 0
        ) {
            throw new Error(
                "Storage expiresAt must be null or a valid timestamp.",
            );
        }

        if (timestamp < createdAt) {
            throw new Error(
                "Storage expiresAt cannot be earlier than createdAt.",
            );
        }
    }

    /**
     * Validates the schema version.
     */
    private validateVersion(
        version: number,
    ): void {

        if (
            !Number.isInteger(version) ||
            version < 1
        ) {
            throw new Error(
                "Storage version must be a positive integer.",
            );
        }
    }

    /**
     * Validates metadata.
     */
    private validateMetadata(
        metadata?: Record<string, unknown>,
    ): void {

        if (metadata === undefined) {
            return;
        }

        if (
            typeof metadata !== "object" ||
            metadata === null ||
            Array.isArray(metadata)
        ) {
            throw new Error(
                "Storage metadata must be an object.",
            );
        }
    }
}