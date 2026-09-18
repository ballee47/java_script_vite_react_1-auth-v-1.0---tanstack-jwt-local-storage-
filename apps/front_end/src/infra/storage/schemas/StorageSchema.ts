/**
 * Represents the complete internal record stored by the storage system.
 *
 * @template T The type of the stored value.
 */
export interface StorageSchema<T = unknown> {
    /**
     * Unique storage key.
     */
    key: string;

    /**
     * Actual value associated with the key.
     */
    value: T;

    /**
     * Timestamp when the record was created.
     */
    createdAt: number;

    /**
     * Timestamp when the record was last updated.
     */
    updatedAt: number;

    /**
     * Timestamp when the record expires.
     *
     * `null` means the record does not expire.
     */
    expiresAt: number | null;

    /**
     * Version of the storage record.
     */
    version: number;

    /**
     * Optional metadata associated with the record.
     */
    metadata?: Record<string, unknown>;
}