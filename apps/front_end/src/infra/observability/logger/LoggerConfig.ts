
import type { LogLevel } from "./LogLevel";

export interface LoggerConfig {
  readonly minLevel: LogLevel;
  readonly enabled: boolean;
  readonly appName: string;
  readonly environment: string;
}

export const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
  minLevel: "debug",
  enabled: true,
  appName: "auth-remake",
  environment: "development",
};
