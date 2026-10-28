
const REDACTED = "[REDACTED]";
const MAX_DEPTH = 5;
const MAX_ARRAY_LENGTH = 50;
const MAX_STRING_LENGTH = 2_000;

const SENSITIVE_KEY =
  /password|passwd|secret|token|authorization|cookie|api[-_]?key|access[-_]?key|private[-_]?key|credential/i;

function sanitizeString(value: string): string {
  return value
    .replace(/\bBearer\s+[A-Za-z0-9._~+/-]+=*/gi, "Bearer [REDACTED]")
    .replace(
      /\beyJ[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\b/g,
      REDACTED,
    )
    .replace(
      /((?:password|passwd|secret|token|api[_-]?key|access[_-]?key)\s*[=:]\s*)[^&\s,;]+/gi,
      `$1${REDACTED}`,
    )
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .slice(0, MAX_STRING_LENGTH);
}

export function sanitizeLogValue(
  value: unknown,
  depth = 0,
  seen = new WeakSet<object>(),
): unknown {
  try {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value === "string") {
      return sanitizeString(value);
    }

    if (
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return Number.isFinite(value as number) ||
        typeof value === "boolean"
        ? value
        : String(value);
    }

    if (typeof value === "bigint") {
      return value.toString();
    }

    if (
      typeof value === "function" ||
      typeof value === "symbol"
    ) {
      return `[Unsupported ${typeof value}]`;
    }

    if (typeof value !== "object") {
      return String(value);
    }

    if (depth >= MAX_DEPTH) {
      return "[Max depth reached]";
    }

    if (seen.has(value)) {
      return "[Circular reference]";
    }

    seen.add(value);

    if (value instanceof Date) {
      return Number.isNaN(value.getTime())
        ? "[Invalid Date]"
        : value.toISOString();
    }

    if (value instanceof Error) {
      return {
        name: sanitizeString(value.name),
        message: sanitizeString(value.message),
        ...(value.stack
          ? { stack: sanitizeString(value.stack) }
          : {}),
      };
    }

    if (Array.isArray(value)) {
      return value
        .slice(0, MAX_ARRAY_LENGTH)
        .map((item) =>
          sanitizeLogValue(item, depth + 1, seen),
        )
        .concat(
          value.length > MAX_ARRAY_LENGTH
            ? ["[Array truncated]"]
            : [],
        );
    }

    const result: Record<string, unknown> = {};
    const descriptors = Object.getOwnPropertyDescriptors(value);

    for (const key of Object.keys(descriptors)) {
      const descriptor = descriptors[key];

      if (!descriptor.enumerable) continue;

      if (SENSITIVE_KEY.test(key)) {
        result[key] = REDACTED;
        continue;
      }

      // Do not execute getters supplied by arbitrary objects.
      if (!("value" in descriptor)) {
        result[key] = "[Getter omitted]";
        continue;
      }

      result[sanitizeString(key)] = sanitizeLogValue(
        descriptor.value,
        depth + 1,
        seen,
      );
    }

    return result;
  } catch {
    return "[Unserializable value]";
  }
}
