/**
 * Default configuration values used throughout the storage system.
 */
export const StorageDefaults = {
  /**
   * Default storage namespace.
   */
  namespace: "app",

  /**
   * Default schema version.
   */
  version: 1,

  /**
   * Default time-to-live.
   *
   * Null means the value never expires.
   */
  ttl: null as number | null,

  /**
   * Serialize values before storing.
   */
  serialize: true,

  /**
   * Encrypt values before storing.
   */
  encrypt: false,

  /**
   * Validate values before storing.
   */
  validate: true,

  /**
   * Allow overwriting existing values.
   */
  overwrite: true,
} as const;