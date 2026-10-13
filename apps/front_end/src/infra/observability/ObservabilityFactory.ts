
import { ConsoleLogger } from "./logger/ConsoleLogger";
import { InMemoryMetrics } from "./metrics/InMemoryMetrics";
import { ConsoleTracer } from "./tracing/ConsoleTracer";
import { ErrorHandler } from "./errors/ErrorHandler";

import type { Observability } from "./Observability";

export class ObservabilityFactory {
  private static readonly logger = new ConsoleLogger();

  private static readonly metrics = new InMemoryMetrics();

  private static readonly tracer = new ConsoleTracer();

  private static readonly errorHandler = new ErrorHandler(
    ObservabilityFactory.logger
  );

  private static readonly instance: Observability = {
    logger: ObservabilityFactory.logger,
    metrics: ObservabilityFactory.metrics,
    tracer: ObservabilityFactory.tracer,
    errors: ObservabilityFactory.errorHandler,

    initialize(): void {
      // Reserved for observability initialization.
    },

    async flush(): Promise<void> {
      // Flush buffered telemetry here when supported.
    },

    async shutdown(): Promise<void> {
      await this.flush();
    },
  };

  private constructor() {}

  public static create(): Observability {
    return ObservabilityFactory.instance;
  }

  public static getInstance(): Observability {
    return ObservabilityFactory.instance;
  }

  
}

