import type { IStorageMetrics } from "../interfaces/IStorageMetrics";

export class InMemoryStorageMetrics implements IStorageMetrics {
  private readonly counters = new Map<string, number>();

  increment(
    name: string,
    value = 1,
    _metadata?: Record<string, unknown>
  ): void {
    const current = this.counters.get(name) ?? 0;

    this.counters.set(name, current + value);
  }

  timing(
    name: string,
    duration: number,
    _metadata?: Record<string, unknown>
  ): void {
    console.debug(`[metric] ${name}`, duration);
  }

  getCounter(name: string): number {
    return this.counters.get(name) ?? 0;
  }
}