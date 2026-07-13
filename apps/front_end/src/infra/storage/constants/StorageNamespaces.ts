/**
 * Default namespaces used by the storage system.
 */
export const StorageNamespaces = {
  /**
   * Default namespace.
   */
  DEFAULT: "app",

  /**
   * Authentication data.
   */
  AUTH: "auth",

  /**
   * Cache storage.
   */
  CACHE: "cache",

  /**
   * Application settings.
   */
  SETTINGS: "settings",

  /**
   * User preferences.
   */
  PREFERENCES: "preferences",
} as const;