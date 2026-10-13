
import type { ITracer } from "./ITracer";
import type { ISpan } from "./ISpan";

import { Span } from "../Span";

import type {
  SpanContext,
  SpanOptions,
  SpanSnapshot,
  TraceId,
  SpanId,
} from "../types/TraceTypes";

export interface InMemoryTracerOptions {
  /**
   * Maximum number of completed spans retained in memory.
   */
  readonly maxFinishedSpans?: number;
}

export class InMemoryTracer implements ITracer {
  private readonly finishedSpans: SpanSnapshot[] = [];

  private readonly activeSpans: ISpan[] = [];

  private readonly maxFinishedSpans: number;

  constructor(options: InMemoryTracerOptions = {}) {
    this.maxFinishedSpans = options.maxFinishedSpans ?? 10_000;

    if (
      !Number.isSafeInteger(this.maxFinishedSpans) ||
      this.maxFinishedSpans < 0
    ) {
      throw new Error(
        "maxFinishedSpans must be a non-negative safe integer.",
      );
    }
  }

  startSpan(
    name: string,
    options: SpanOptions = {},
  ): ISpan {
    const parent =
      options.parent ?? this.getActiveSpanContext();

    const traceId: TraceId =
      parent?.traceId ?? this.generateTraceId();

    const spanId: SpanId = this.generateSpanId();

    const context: SpanContext = Object.freeze({
      traceId,
      spanId,
      traceFlags: parent?.traceFlags ?? 1,
      isRemote: false,
    });

    const span = new Span(context, name, {
      kind: options.kind,
      attributes: options.attributes,
      parentSpanId: parent?.spanId,
    });

    const originalEnd = span.end.bind(span);

    span.end = (endTime?: number): void => {
      const wasEnded = span.ended;

      originalEnd(endTime);

      if (!wasEnded && span.ended) {
        this.recordFinishedSpan(span);
      }
    };

    return span;
  }

  getActiveSpanContext(): SpanContext | undefined {
    for (let index = this.activeSpans.length - 1; index >= 0; index--) {
      const span = this.activeSpans[index];

      if (span && !span.ended) {
        return span.context;
      }
    }

    return undefined;
  }

  withSpan<T>(
    span: ISpan,
    callback: () => T,
  ): T {
    this.activeSpans.push(span);

    let result: T;

    try {
      result = callback();
    } catch (error: unknown) {
      this.removeActiveSpan(span);
      throw error;
    }

    if (
      result !== null &&
      (typeof result === "object" || typeof result === "function") &&
      "then" in result &&
      typeof result.then === "function"
    ) {
      return Promise.resolve(result).finally(() => {
        this.removeActiveSpan(span);
      }) as T;
    }

    this.removeActiveSpan(span);

    return result;
  }

  getFinishedSpans(): readonly SpanSnapshot[] {
    return Object.freeze([...this.finishedSpans]);
  }

  clearFinishedSpans(): void {
    this.finishedSpans.length = 0;
  }

  private recordFinishedSpan(span: ISpan): void {
    if (this.maxFinishedSpans === 0) {
      return;
    }

    this.finishedSpans.push(span.toSnapshot());

    if (this.finishedSpans.length > this.maxFinishedSpans) {
      this.finishedSpans.shift();
    }
  }

  private removeActiveSpan(span: ISpan): void {
    const index = this.activeSpans.lastIndexOf(span);

    if (index !== -1) {
      this.activeSpans.splice(index, 1);
    }
  }

  private generateTraceId(): TraceId {
    return this.generateHexId(32);
  }

  private generateSpanId(): SpanId {
    return this.generateHexId(16);
  }

  private generateHexId(length: number): string {
    const cryptoApi = globalThis.crypto;

    if (!cryptoApi?.getRandomValues) {
      throw new Error(
        "Secure random ID generation is unavailable in this runtime.",
      );
    }

    const bytes = new Uint8Array(length / 2);
    cryptoApi.getRandomValues(bytes);

    return Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
  }
}
