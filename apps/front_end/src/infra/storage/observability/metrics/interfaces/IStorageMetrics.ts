export interface IStorageMetrics {
  increment(
    name: string,
    value?: number,
    metadata?: Record<string, unknown>
  ): void;

  timing(
    name: string,
    duration: number,
    metadata?: Record<string, unknown>
  ): void;
}