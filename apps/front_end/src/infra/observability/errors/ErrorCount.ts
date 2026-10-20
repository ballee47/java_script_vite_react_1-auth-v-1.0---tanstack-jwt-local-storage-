
import type { ErrorCode } from "./ErrorCode";

export class ErrorCount {
  private readonly counts = new Map<ErrorCode, number>();
  private total = 0;

  public record(code: ErrorCode): void {
    this.total += 1;

    const currentCount = this.counts.get(code) ?? 0;

    this.counts.set(code, currentCount + 1);
  }

  public getCount(code: ErrorCode): number {
    return this.counts.get(code) ?? 0;
  }

  public getTotalCount(): number {
    return this.total;
  }

  public getSnapshot(): ReadonlyMap<ErrorCode, number> {
    return new Map(this.counts);
  }

  public reset(): void {
    this.counts.clear();
    this.total = 0;
  }
}
