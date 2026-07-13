/**
 * Reserved keys used internally by the storage system.
 *
 * These keys should never be used directly by
 * application code.
 */
export const StorageKeys = {
  /**
   * Metadata object.
   */
  METADATA: "__metadata__",

  /**
   * Schema version.
   */
  VERSION: "__version__",

  /**
   * Expiration timestamp.
   */
  EXPIRES_AT: "__expiresAt__",

  /**
   * Creation timestamp.
   */
  CREATED_AT: "__createdAt__",

  /**
   * Last update timestamp.
   */
  UPDATED_AT: "__updatedAt__",

  /**
   * Namespace identifier.
   */
  NAMESPACE: "__namespace__",
} as const;