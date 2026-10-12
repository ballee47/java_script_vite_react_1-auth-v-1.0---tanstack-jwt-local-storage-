
import type {
  SpanContext,
  SpanEvent,
  SpanStatus,
  SpanAttributes,
} from "./TraceTypes";

export interface ISpan {
  /**
   * Returns the identity of this span and its trace.
   */
  readonly context: SpanContext;

  /**
   * Returns the span's name.
   */
  readonly name: string;

  /**
   * Returns whether this span has ended.
   */
  readonly ended: boolean;

  /**
   * Adds or updates attributes describing this operation.
   */
  setAttribute(
    key: string,
    value: string | number | boolean,
  ): void;

  /**
   * Adds multiple attributes to this span.
   */
  setAttributes(attributes: SpanAttributes): void;

  /**
   * Records an event that occurred during this operation.
   */
  addEvent(
    name: string,
    attributes?: SpanAttributes,
  ): void;

  /**
   * Sets the span's final status.
   */
  setStatus(status: SpanStatus): void;

  /**
   * Records an exception as a span event and marks the span as failed.
   */
  recordException(error: unknown): void;

  /**
   * Ends the span and records its completion time.
   */
  end(endTime?: number): void;

  /**
   * Returns an immutable snapshot of the span's current state.
   */
  toSnapshot(): import("./TraceTypes").SpanSnapshot;
}
