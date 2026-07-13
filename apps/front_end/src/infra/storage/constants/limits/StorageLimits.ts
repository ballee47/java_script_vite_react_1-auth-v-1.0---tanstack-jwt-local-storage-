/**
 * Limits enforced by the storage system.
 */
export const StorageLimits = {
  /**
   * Maximum storage key length.
   */
  MAX_KEY_LENGTH: 256,

  /**
   * Maximum namespace length.
   */
  MAX_NAMESPACE_LENGTH: 64,

  /**
   * Maximum serialized value size (5 MB).
   */
  MAX_VALUE_SIZE: 5 * 1024 * 1024,

  /**
   * Maximum TTL (1 year in milliseconds).
   */
  MAX_TTL: 365 * 24 * 60 * 60 * 1000,

  /**
   * Maximum schema version.
   */
  MAX_VERSION: 100,
} as const;