/**
 * Base configuration shared by all storage operations.
 */
export interface StorageOptions {
  /**
   * Storage namespace.
   * Example:
   * auth:user
   * cart:items
   */
  namespace?: string;
}