
import type { ITracer } from "./interface/ITracer";
import type { ISpan } from "./interface/ISpan";

import { Span } from "./Span";

import type {
  SpanContext,
  SpanOptions,
  SpanSnapshot,
  TraceId,
  SpanId,
} from "./types/TraceTypes";

export interface ConsoleTracerOptions {
  readonly logFinishedSpans?: boolean;
}

export class ConsoleTracer implements ITracer {
  private readonly activeSpans: ISpan[] = [];
  private readonly finishedSpans: SpanSnapshot[] = [];

  private readonly logFinishedSpans: boolean;

  constructor(options: ConsoleTracerOptions = {}) {
    this.logFinishedSpans = options.logFinishedSpans ?? true;
  }

  startSpan(
    name: string,
    options: SpanOptions = {},
  ): ISpan {
    const parent =
      options.parent ?? this.getActiveSpanContext();

    const context: SpanContext = Object.freeze({
      traceId: parent?.traceId ?? this.generateTraceId(),
      spanId: this.generateSpanId(),
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
    for (
      let index = this.activeSpans.length - 1;
      index >= 0;
      index--
    ) {
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
      (typeof result === "object" ||
        typeof result === "function") &&
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
    const snapshot = span.toSnapshot();

    this.finishedSpans.push(snapshot);

    if (this.logFinishedSpans) {
      console.info("[TRACE]", snapshot);
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
