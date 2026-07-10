import { StorageOptions } from "./StorageOptions";

/**
 * Options used when storing data.
 */
export interface StorageSetOptions extends StorageOptions {
  /**
   * Encrypt before storing.
   */
  encrypt?: boolean;

  /**
   * Serialize before storing.
   */
  serialize?: boolean;

  /**
   * Validate before storing.
   */
  validate?: boolean;

  /**
   * Expiration time in milliseconds.
   */
  ttl?: number;

  /**
   * Schema version.
   */
  version?: number;

  /**
   * Replace existing value.
   */
  overwrite?: boolean;
}