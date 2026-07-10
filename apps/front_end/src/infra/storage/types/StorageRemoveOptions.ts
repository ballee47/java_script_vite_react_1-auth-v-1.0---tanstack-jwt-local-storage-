import { StorageOptions } from "./StorageOptions";

/**
 * Options used when removing data.
 */
export interface StorageRemoveOptions extends StorageOptions {
  /**
   * Ignore the operation if the key does not exist.
   */
  silent?: boolean;
}