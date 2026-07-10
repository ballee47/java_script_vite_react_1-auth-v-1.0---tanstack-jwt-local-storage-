/**
 * Represents the structure of a value stored by the storage system.
 *
 * Every item saved in storage is wrapped inside this schema
 * so metadata can be managed consistently.
 */
export interface StorageSchema<T> {
  /**
   * Storage key.
   */
  key: string;

  /**
   * Actual value being stored.
   */
  value: T;

  /**
   * Timestamp when the item was created.
   */
  createdAt: number;

  /**
   * Timestamp when the item was last updated.
   */
  updatedAt: number;

  /**
   * Expiration timestamp.
   *
   * Null means the value never expires.
   */
  expiresAt: number | null;

  /**
   * Schema version.
   */
  version: number;

  /**
   * Optional metadata.
   *
   * Used for future extensions without
   * changing the schema.
   */
  metadata?: Record<string, unknown>;
}