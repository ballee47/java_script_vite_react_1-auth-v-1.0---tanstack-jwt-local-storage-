

export interface StorageAdapter {
  set(
    key: string,
    value: string
  ): void;

  get(
    key: string
  ): string | null;

  remove(
    key: string
  ): void;

  clear(): void;

  has(key: string): boolean;

  keys(): string[];

  size(): number;
}