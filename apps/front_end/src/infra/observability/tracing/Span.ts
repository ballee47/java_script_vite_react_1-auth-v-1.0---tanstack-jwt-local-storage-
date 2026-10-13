
import type { ISpan } from "./interface/ISpan";

import type {
  AttributeValue,
  SpanAttributes,
  SpanContext,
  SpanEvent,
  SpanId,
  SpanKind,
  SpanSnapshot,
  SpanStatus,
} from "./types/TraceTypes";

export interface SpanImplementationOptions {
  readonly kind?: SpanKind;
  readonly attributes?: SpanAttributes;
  readonly parentSpanId?: SpanId;
  readonly startTime?: number;
}

export class Span implements ISpan {
  private readonly _context: SpanContext;
  private readonly _name: string;
  private readonly _kind: SpanKind;
  private readonly _startTime: number;
  private readonly _startMonotonicTime: number;
  private readonly _parentSpanId?: SpanId;

  private readonly _attributes: Record<string, AttributeValue> = {};
  private readonly _events: SpanEvent[] = [];

  private _status: SpanStatus = { code: "unset" };
  private _endTime?: number;
  private _durationMs?: number;
  private _ended = false;

  constructor(
    context: SpanContext,
    name: string,
    options: SpanImplementationOptions = {},
  ) {
    if (!name.trim()) {
      throw new Error("Span name must not be empty.");
    }

    if (!context.traceId || !context.spanId) {
      throw new Error("Span context must contain traceId and spanId.");
    }

    this._context = Object.freeze({ ...context });
    this._name = name;
    this._kind = options.kind ?? "internal";
    this._parentSpanId = options.parentSpanId;

    const startTime = options.startTime ?? Date.now();

    if (!Number.isFinite(startTime) || startTime < 0) {
      throw new Error("Span startTime must be a valid timestamp.");
    }

    this._startTime = startTime;
    this._startMonotonicTime = this.getMonotonicTime();

    if (options.attributes) {
      this.setAttributes(options.attributes);
    }
  }

  get context(): SpanContext {
    return this._context;
  }

  get name(): string {
    return this._name;
  }

  get ended(): boolean {
    return this._ended;
  }

  setAttribute(
    key: string,
    value: string | number | boolean,
  ): void {
    this.assertActive();
    this.validateAttributeKey(key);
    this.validateAttributeValue(value);

    this._attributes[key] = value;
  }

  setAttributes(attributes: SpanAttributes): void {
    this.assertActive();

    for (const [key, value] of Object.entries(attributes)) {
      this.validateAttributeKey(key);
      this.validateAttributeValue(value);
    }

    for (const [key, value] of Object.entries(attributes)) {
      this._attributes[key] = this.copyAttributeValue(value);
    }
  }

  addEvent(
    name: string,
    attributes?: SpanAttributes,
  ): void {
    this.assertActive();

    if (!name.trim()) {
      throw new Error("Span event name must not be empty.");
    }

    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        this.validateAttributeKey(key);
        this.validateAttributeValue(value);
      }
    }

    const event: SpanEvent = Object.freeze({
      name,
      timestamp: Date.now(),
      ...(attributes
        ? { attributes: this.freezeAttributes(attributes) }
        : {}),
    });

    this._events.push(event);
  }

  setStatus(status: SpanStatus): void {
    this.assertActive();

    const validCodes = ["unset", "ok", "error"];

    if (!validCodes.includes(status.code)) {
      throw new Error("Invalid span status code.");
    }

    this._status = Object.freeze({
      code: status.code,
      ...(status.message !== undefined
        ? { message: status.message }
        : {}),
    });
  }

  recordException(error: unknown): void {
    this.assertActive();

    const isError = error instanceof Error;

    const message = isError
      ? error.message
      : String(error);

    const type = isError
      ? error.name
      : typeof error;

    this.addEvent("exception", {
      "exception.type": type,
      "exception.message": message,
    });

    this.setStatus({
      code: "error",
      message,
    });
  }

  end(endTime?: number): void {
    if (this._ended) {
      return;
    }

    const completedAt = endTime ?? Date.now();

    if (!Number.isFinite(completedAt) || completedAt < this._startTime) {
      throw new Error(
        "Span endTime must be a valid timestamp not earlier than startTime.",
      );
    }

    const duration = this.getMonotonicTime() - this._startMonotonicTime;

    this._endTime = completedAt;
    this._durationMs = Math.max(0, duration);
    this._ended = true;
  }

  toSnapshot(): SpanSnapshot {
    return Object.freeze({
      context: this._context,
      ...(this._parentSpanId
        ? { parentSpanId: this._parentSpanId }
        : {}),
      name: this._name,
      kind: this._kind,
      startTime: this._startTime,
      ...(this._endTime !== undefined
        ? { endTime: this._endTime }
        : {}),
      ...(this._durationMs !== undefined
        ? { durationMs: this._durationMs }
        : {}),
      status: Object.freeze({ ...this._status }),
      attributes: this.freezeAttributes(this._attributes),
      events: Object.freeze([...this._events]),
      ended: this._ended,
    });
  }

  private assertActive(): void {
    if (this._ended) {
      throw new Error(
        `Cannot modify ended span "${this._name}".`,
      );
    }
  }

  private validateAttributeKey(key: string): void {
    if (!key.trim()) {
      throw new Error("Span attribute key must not be empty.");
    }
  }

  private validateAttributeValue(value: AttributeValue): void {
    if (typeof value === "number" && !Number.isFinite(value)) {
      throw new Error("Numeric span attributes must be finite.");
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (
          typeof item === "number" &&
          !Number.isFinite(item)
        ) {
          throw new Error(
            "Numeric span attribute values must be finite.",
          );
        }

        if (
          typeof item !== "string" &&
          typeof item !== "number" &&
          typeof item !== "boolean"
        ) {
          throw new Error("Unsupported span attribute value.");
        }
      }
    }
  }

  private copyAttributeValue(
    value: AttributeValue,
  ): AttributeValue {
    return Array.isArray(value)
      ? Object.freeze([...value]) as AttributeValue
      : value;
  }

  private freezeAttributes(
    attributes: SpanAttributes,
  ): SpanAttributes {
    const copy: Record<string, AttributeValue> = {};

    for (const [key, value] of Object.entries(attributes)) {
      copy[key] = this.copyAttributeValue(value);
    }

    return Object.freeze(copy);
  }

  private getMonotonicTime(): number {
    return typeof performance !== "undefined"
      ? performance.now()
      : Date.now();
  }
}
