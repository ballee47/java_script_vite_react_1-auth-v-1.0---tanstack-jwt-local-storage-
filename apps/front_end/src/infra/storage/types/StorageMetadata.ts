/**
 * Additional information about a stored item.
 *
 * This metadata is optional and can be extended
 * without changing the main StorageSchema.
 */
export interface StorageMetadata {
  /**
   * Indicates whether the value is encrypted.
   */
  encrypted?: boolean;

  /**
   * Indicates whether the value is compressed.
   */
  compressed?: boolean;

  /**
   * Namespace of the stored item.
   */
  namespace?: string;

  /**
   * Name of the adapter that stored the item.
   */
  adapter?: string;
}