import type { ConsoleLogger } from "./logger/ConsoleLogger";
import type { InMemoryMetrics } from "./metrics/InMemoryMetrics";
import type { ConsoleTracer } from "./tracing/ConsoleTracer";
import type { ErrorHandler } from "./errors/ErrorHandler";

export interface Observability {
  readonly logger: ConsoleLogger;

  readonly metrics: InMemoryMetrics;

  readonly tracer: ConsoleTracer;

  readonly errors: ErrorHandler;

  initialize(): void;

  flush(): Promise<void>;

  shutdown(): Promise<void>;
}
