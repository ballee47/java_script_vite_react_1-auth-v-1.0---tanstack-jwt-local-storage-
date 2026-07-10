import { StorageOptions } from "./StorageOptions";

/**
 * Options used when clearing storage.
 */
export interface StorageClearOptions extends StorageOptions {
  /**
   * Clear only the current namespace.
   */
  namespaceOnly?: boolean;
}