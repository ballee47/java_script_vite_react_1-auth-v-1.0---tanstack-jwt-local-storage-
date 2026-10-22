
import { ConsoleLogger } from "./logger/ConsoleLogger";
import { InMemoryMetrics } from "./metrics/InMemoryMetrics";
import { ConsoleTracer } from "./tracing/ConsoleTracer";
import { ErrorCount } from "./errors/ErrorCount";
import { ErrorHandler } from "./errors/ErrorHandler";

import type { Observability } from "./Observability";

// ============================================================
// STEP 1: DEFINE THE OBSERVABILITY FACTORY
// ============================================================
// ObservabilityFactory is responsible for creating and managing
// the application's observability components.
//
// It brings together:
// 1. Logger  - records application log messages.
// 2. Metrics - tracks measurements and counters.
// 3. Tracer  - records tracing information.
// 4. Errors  - normalizes, counts, and logs errors.
//
// The factory provides a single, shared Observability instance.
export class ObservabilityFactory {

  // ==========================================================
  // STEP 2: CREATE THE SHARED LOGGER
  // ==========================================================
  // ConsoleLogger implements the ILogger interface.
  //
  // It writes debug, info, warning, and error messages
  // through the JavaScript console API.
  //
  // `static readonly` means this class owns one shared
  // reference to the logger, which cannot be reassigned.
private static readonly logger = new ConsoleLogger({
  minLevel: "debug",
  enabled: true,
  appName: "auth-remake",
  environment: "development",
});
  // ==========================================================
  // STEP 3: CREATE THE SHARED METRICS COLLECTOR
  // ==========================================================
  // InMemoryMetrics stores application metrics in memory.
  //
  // These metrics can be recorded and retrieved while the
  // application is running, depending on its implementation.
  //
  // Data stored only in memory is not automatically persistent.
  private static readonly metrics = new InMemoryMetrics();

  // ==========================================================
  // STEP 4: CREATE THE SHARED TRACER
  // ==========================================================
  // ConsoleTracer handles tracing operations.
  //
  // It provides the tracing implementation used by this
  // observability setup.
  private static readonly tracer = new ConsoleTracer();

  // ==========================================================
  // STEP 5: CREATE THE SHARED ERROR COUNTER
  // ==========================================================
  // ErrorCount tracks error occurrences, typically by error code.
  //
  // This dependency is shared with ErrorHandler so errors
  // handled by the observability system can update the counter.
  private static readonly errorCount = new ErrorCount();

  // ==========================================================
  // STEP 6: CREATE THE ERROR HANDLER
  // ==========================================================
  // Inject the shared logger and error counter into ErrorHandler.
  //
  // When errors are handled, ErrorHandler can:
  // 1. Normalize the incoming error.
  // 2. Record its normalized error code.
  // 3. Build structured logging context.
  // 4. Write a warning or error log.
  //
  // ErrorHandler does not create its own logger or counter;
  // it receives the dependencies managed by this factory.
  private static readonly errorHandler = new ErrorHandler(
    ObservabilityFactory.logger,
    ObservabilityFactory.errorCount,
  );

  // ==========================================================
  // STEP 7: ASSEMBLE THE OBSERVABILITY INSTANCE
  // ==========================================================
  // Combine the shared components into one object that
  // satisfies the Observability interface.
  //
  // Other application modules can access the components
  // through this single object.
  private static readonly instance: Observability = {

    // Expose the shared logging implementation.
    logger: ObservabilityFactory.logger,

    // Expose the shared metrics collector.
    metrics: ObservabilityFactory.metrics,

    // Expose the shared tracing implementation.
    tracer: ObservabilityFactory.tracer,

    // Expose the error-handling service.
    errors: ObservabilityFactory.errorHandler,

    // ========================================================
    // STEP 8: DEFINE INITIALIZATION
    // ========================================================
    // This method is currently a placeholder.
    //
    // Add startup logic here if your observability components
    // need configuration or explicit initialization later.
    initialize(): void {
      // Reserved for observability initialization.
    },

    // ========================================================
    // STEP 9: DEFINE FLUSHING
    // ========================================================
    // Flush is intended to send any buffered logs, metrics,
    // or tracing data to their destinations.
    //
    // Currently, no flushing logic is implemented.
    async flush(): Promise<void> {
      // Flush buffered telemetry here when supported.
    },

    // ========================================================
    // STEP 10: DEFINE SHUTDOWN
    // ========================================================
    // Shutdown calls flush() before the observability system
    // finishes its shutdown process.
    //
    // Awaiting flush ensures its asynchronous work completes
    // before shutdown() resolves.
    async shutdown(): Promise<void> {
      await this.flush();
    },
  };

  // ==========================================================
  // STEP 11: PREVENT DIRECT INSTANTIATION
  // ==========================================================
  // The private constructor prevents application code from
  // creating ObservabilityFactory instances with `new`.
  //
  // Consumers must use the public static methods instead.
  private constructor() {}

  // ==========================================================
  // STEP 12: PROVIDE THE OBSERVABILITY INSTANCE
  // ==========================================================
  // create() returns the shared observability object.
  //
  // This is useful as the primary factory entry point.
  public static create(): Observability {
    return ObservabilityFactory.instance;
  }

  // ==========================================================
  // STEP 13: PROVIDE AN INSTANCE ACCESSOR
  // ==========================================================
  // getInstance() returns the same shared object as create().
  //
  // Both methods currently have identical behavior.
  // You could keep both for API clarity, or use just one
  // if your project does not need two entry points.
  public static getInstance(): Observability {
    return ObservabilityFactory.instance;
  }
}
