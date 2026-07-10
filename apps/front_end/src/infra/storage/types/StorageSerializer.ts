/**
 * Defines how values are converted to and from a storable format.
 */
export interface StorageSerializer {

  /**
   * Converts a value into a string.
   */
  serialize<T>(value: T): string;

  /**
   * Restores a value from its serialized form.
   */
  deserialize<T>(value: string): T;
}