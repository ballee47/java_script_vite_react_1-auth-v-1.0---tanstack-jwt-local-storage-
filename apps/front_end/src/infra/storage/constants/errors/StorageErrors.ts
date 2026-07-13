/**
 * Standard error messages used by the storage system.
 */
export const StorageErrors = {
  /**
   * Storage key errors.
   */
  EMPTY_KEY: "Storage key cannot be empty.",

  INVALID_KEY: "Storage key is invalid.",

  KEY_TOO_LONG: "Storage key exceeds the maximum allowed length.",

  /**
   * Namespace errors.
   */
  INVALID_NAMESPACE: "Storage namespace is invalid.",

  NAMESPACE_TOO_LONG:
    "Storage namespace exceeds the maximum allowed length.",

  /**
   * Value errors.
   */
  VALUE_TOO_LARGE:
    "Storage value exceeds the maximum allowed size.",

  INVALID_VALUE: "Storage value is invalid.",

  /**
   * TTL errors.
   */
  INVALID_TTL: "Storage TTL is invalid.",

  TTL_EXCEEDED:
    "Storage TTL exceeds the maximum allowed value.",

  /**
   * Serialization errors.
   */
  SERIALIZATION_FAILED:
    "Failed to serialize storage value.",

  DESERIALIZATION_FAILED:
    "Failed to deserialize storage value.",

  /**
   * Encryption errors.
   */
  ENCRYPTION_FAILED:
    "Failed to encrypt storage value.",

  DECRYPTION_FAILED:
    "Failed to decrypt storage value.",

  /**
   * Storage operation errors.
   */
  ITEM_NOT_FOUND:
    "Storage item was not found.",

  QUOTA_EXCEEDED:
    "Storage quota has been exceeded.",

  STORAGE_UNAVAILABLE:
    "Storage is unavailable.",

  UNKNOWN_ERROR:
    "An unknown storage error occurred.",
} as const;