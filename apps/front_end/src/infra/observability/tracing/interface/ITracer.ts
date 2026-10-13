
import type {
  SpanContext,
  SpanOptions,
  SpanSnapshot,
} from "../types/TraceTypes";

import type { ISpan } from "./ISpan";

export interface ITracer {
  /**
   * Starts a new span.
   *
   * If a parent context is provided, the new span belongs
   * to the same trace and becomes its child.
   */
  startSpan(
    name: string,
    options?: SpanOptions,
  ): ISpan;

  /**
   * Returns the active span context, if one exists.
   */
  getActiveSpanContext(): SpanContext | undefined;

  /**
   * Executes a callback with the supplied span as the active span.
   *
   * Implementations should restore the previous active span
   * after the callback completes, including when it throws.
   */
  withSpan<T>(
    span: ISpan,
    callback: () => T,
  ): T;

  /**
   * Returns snapshots of completed spans recorded by this tracer.
   */
  getFinishedSpans(): readonly SpanSnapshot[];

  /**
   * Clears the tracer's finished-span collection.
   */
  clearFinishedSpans(): void;
}
