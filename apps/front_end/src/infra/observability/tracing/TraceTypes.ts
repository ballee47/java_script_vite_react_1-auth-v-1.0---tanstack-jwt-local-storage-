
export type TraceId = string;

export type SpanId = string;

export type SpanKind =
  | "internal"
  | "server"
  | "client"
  | "producer"
  | "consumer";

export type SpanStatusCode = "unset" | "ok" | "error";

export type AttributeValue =
  | string
  | number
  | boolean
  | readonly string[]
  | readonly number[]
  | readonly boolean[];

export type SpanAttributes = Readonly<
  Record<string, AttributeValue>
>;

export interface SpanContext {
  readonly traceId: TraceId;
  readonly spanId: SpanId;
  readonly traceFlags: number;
  readonly isRemote: boolean;
}

export interface SpanStatus {
  readonly code: SpanStatusCode;
  readonly message?: string;
}

export interface SpanEvent {
  readonly name: string;
  readonly timestamp: number;
  readonly attributes?: SpanAttributes;
}

export interface SpanOptions {
  readonly kind?: SpanKind;
  readonly attributes?: SpanAttributes;
  readonly parent?: SpanContext | null;
}

export interface SpanSnapshot {
  readonly context: SpanContext;
  readonly parentSpanId?: SpanId;
  readonly name: string;
  readonly kind: SpanKind;
  readonly startTime: number;
  readonly endTime?: number;
  readonly durationMs?: number;
  readonly status: SpanStatus;
  readonly attributes: SpanAttributes;
  readonly events: readonly SpanEvent[];
  readonly ended: boolean;
}
