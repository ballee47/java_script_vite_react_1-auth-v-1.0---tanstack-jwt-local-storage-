import { StorageOptions } from "./StorageOptions";

/**
 * Options used when retrieving data.
 */
export interface StorageGetOptions extends StorageOptions {
  /**
   * Automatically decrypt the stored value.
   */
  decrypt?: boolean;

  /**
   * Automatically deserialize the stored value.
   */
  deserialize?: boolean;
}