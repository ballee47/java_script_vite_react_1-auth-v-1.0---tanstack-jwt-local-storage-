type LogMeta = Record<string, unknown>;

class Logger {
  private isDevelopment =
    import.meta.env.MODE === "development";

  info(message: string, meta?: LogMeta) {
    if (!this.isDevelopment) return;

    console.info(
      `[INFO] ${message}`,
      meta ?? ""
    );
  }

  warn(message: string, meta?: LogMeta) {
    if (!this.isDevelopment) return;

    console.warn(
      `[WARN] ${message}`,
      meta ?? ""
    );
  }

  error(
    message: string,
    error?: unknown,
    meta?: LogMeta
  ) {
    if (!this.isDevelopment) return;

    console.error(
      `[ERROR] ${message}`,
      {
        error,
        ...meta,
      }
    );
  }

  debug(message: string, meta?: LogMeta) {
    if (!this.isDevelopment) return;

    console.debug(
      `[DEBUG] ${message}`,
      meta ?? ""
    );
  }
}

export const logger = new Logger();