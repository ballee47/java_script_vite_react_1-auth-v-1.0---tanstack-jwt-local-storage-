
import { ConsoleLogger } from "./logger/ConsoleLogger";
import { ErrorHandler } from "./errors/ErrorHandler";

export class ObservabilityFactory {
  private static readonly logger = new ConsoleLogger();

  private static readonly errorHandler = new ErrorHandler(
    ObservabilityFactory.logger,
  );

  static getLogger(): ConsoleLogger {
    return ObservabilityFactory.logger;
  }

  static getErrorHandler(): ErrorHandler {
    return ObservabilityFactory.errorHandler;
  }
}