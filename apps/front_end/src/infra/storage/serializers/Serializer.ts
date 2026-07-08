export interface Serializer {
  /**
   * Converts a value into a storable string.
   */
  serialize<T>(value: T): string;

  /**
   * Converts a stored string back to its original type.
   */
  deserialize<T>(value: string): T;
}