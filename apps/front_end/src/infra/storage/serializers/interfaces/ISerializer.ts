// serializers/interfaces/ISerializer.ts

export interface ISerializer {
    /**
     * Convert a value into its string representation.
     */
    serialize(value: unknown): string;

    /**
     * Restore a value from its string representation.
     */
    deserialize<T = unknown>(value: string): T;
}