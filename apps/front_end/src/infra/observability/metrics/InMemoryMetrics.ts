
import type { IMetrics } from "./interfaces/IMetrics";
import type { Counter } from "./Counter";
import type { Gauge } from "./Gauge";
import type { Histogram } from "./Histogram";

import type {
  HistogramOptions,
  MetricLabels,
  MetricName,
  MetricOptions,
  MetricSnapshot,
  MetricType,
  MetricsOptions,
  MetricsSnapshot,
} from "./types/MetricTypes";

const DEFAULT_MAX_SERIES = 1_000;

const DEFAULT_HISTOGRAM_BUCKETS = [
  0.005,
  0.01,
  0.025,
  0.05,
  0.1,
  0.25,
  0.5,
  1,
  2.5,
  5,
  10,
] as const;

interface SeriesState {
  readonly labels: MetricLabels;
  value: number;
  count: number;
  sum: number;
  min: number | null;
  max: number | null;
  readonly bucketCounts: number[];
}

interface Registration {
  readonly name: MetricName;
  readonly type: MetricType;
  readonly description?: string;
  readonly unit?: string;
  readonly labelNames?: readonly string[];
  readonly maxSeries: number;
  readonly buckets: readonly number[];
  readonly definition: string;
  readonly series: Map<string, SeriesState>;
}

export class InMemoryMetrics implements IMetrics {
  private readonly registrations =
    new Map<MetricName, Registration>();

  private readonly defaultMaxSeries: number;

  constructor(options: MetricsOptions = {}) {
    this.defaultMaxSeries =
      options.defaultMaxSeries ?? DEFAULT_MAX_SERIES;

    if (
      !Number.isSafeInteger(this.defaultMaxSeries) ||
      this.defaultMaxSeries < 1
    ) {
      throw new Error(
        "defaultMaxSeries must be a positive safe integer.",
      );
    }
  }

  createCounter(options: MetricOptions): Counter {
    const registration = this.register(
      "counter",
      options,
      [],
    );

    return {
      increment: (value = 1, labels = {}) => {
        this.assertNonNegative(value, "Counter increment");

        const series = this.getSeries(registration, labels);
        const nextValue = series.value + value;

        if (!Number.isFinite(nextValue)) {
          throw new Error("Counter value overflow.");
        }

        series.value = nextValue;
      },
    };
  }

  createGauge(options: MetricOptions): Gauge {
    const registration = this.register(
      "gauge",
      options,
      [],
    );

    return {
      set: (value, labels = {}) => {
        this.assertFinite(value, "Gauge value");
        this.getSeries(registration, labels).value = value;
      },

      increment: (value = 1, labels = {}) => {
        this.assertNonNegative(value, "Gauge increment");

        const series = this.getSeries(registration, labels);
        const nextValue = series.value + value;

        if (!Number.isFinite(nextValue)) {
          throw new Error("Gauge value overflow.");
        }

        series.value = nextValue;
      },

      decrement: (value = 1, labels = {}) => {
        this.assertNonNegative(value, "Gauge decrement");

        const series = this.getSeries(registration, labels);
        const nextValue = series.value - value;

        if (!Number.isFinite(nextValue)) {
          throw new Error("Gauge value overflow.");
        }

        series.value = nextValue;
      },
    };
  }

  createHistogram(options: HistogramOptions): Histogram {
    const buckets =
      options.buckets ?? DEFAULT_HISTOGRAM_BUCKETS;

    const registration = this.register(
      "histogram",
      options,
      buckets,
    );

    return {
      observe: (value, labels = {}) => {
        this.assertFinite(value, "Histogram observation");

        const series = this.getSeries(registration, labels);
        const nextCount = series.count + 1;
        const nextSum = series.sum + value;

        if (
          !Number.isSafeInteger(nextCount) ||
          !Number.isFinite(nextSum)
        ) {
          throw new Error("Histogram aggregate overflow.");
        }

        series.count = nextCount;
        series.sum = nextSum;

        series.min =
          series.min === null
            ? value
            : Math.min(series.min, value);

        series.max =
          series.max === null
            ? value
            : Math.max(series.max, value);

        for (let i = 0; i < buckets.length; i++) {
          if (value <= buckets[i]) {
            series.bucketCounts[i]++;
          }
        }
      },
    };
  }

  /**
   * Increment a named counter.
   *
   * Creates the counter on first use and reuses its registration
   * on subsequent calls.
   */
  increment(
    name: MetricName,
    labels: MetricLabels = {},
    value = 1,
  ): void {
    const counter = this.createCounter({ name });
    counter.increment(value, labels);
  }

  /**
   * Record a numeric observation in a named histogram.
   *
   * Creates the histogram on first use and reuses its registration
   * on subsequent calls.
   */
  record(
    name: MetricName,
    value: number,
    labels: MetricLabels = {},
  ): void {
    const histogram = this.createHistogram({ name });
    histogram.observe(value, labels);
  }

  getSnapshot(): MetricsSnapshot {
    const metrics: MetricSnapshot[] = [];

    for (const registration of this.registrations.values()) {
      const series = Array.from(
        registration.series.values(),
        (item) => {
          if (registration.type === "histogram") {
            const bucketSnapshot: Record<string, number> = {};

            registration.buckets.forEach((bound, index) => {
              bucketSnapshot[String(bound)] =
                item.bucketCounts[index];
            });

            bucketSnapshot["+Inf"] = item.count;

            return {
              labels: { ...item.labels },
              count: item.count,
              sum: item.sum,
              min: item.min,
              max: item.max,
              buckets: bucketSnapshot,
            };
          }

          return {
            labels: { ...item.labels },
            value: item.value,
          };
        },
      );

      metrics.push({
        name: registration.name,
        type: registration.type,
        ...(registration.description !== undefined
          ? { description: registration.description }
          : {}),
        ...(registration.unit !== undefined
          ? { unit: registration.unit }
          : {}),
        series,
      } as MetricSnapshot);
    }

    return {
      timestamp: Date.now(),
      metrics,
    };
  }

  reset(): void {
    for (const registration of this.registrations.values()) {
      registration.series.clear();
    }
  }

  private register(
    type: MetricType,
    options: MetricOptions,
    buckets: readonly number[],
  ): Registration {
    this.validateOptions(options);

    if (type === "histogram") {
      this.validateBuckets(buckets);
    }

    const maxSeries =
      options.maxSeries ?? this.defaultMaxSeries;

    if (
      !Number.isSafeInteger(maxSeries) ||
      maxSeries < 1
    ) {
      throw new Error(
        "maxSeries must be a positive safe integer.",
      );
    }

    const labelNames =
      options.labelNames === undefined
        ? undefined
        : [...options.labelNames].sort();

    if (labelNames) {
      for (const name of labelNames) {
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
          throw new Error(`Invalid label name: ${name}`);
        }
      }

      if (new Set(labelNames).size !== labelNames.length) {
        throw new Error("Duplicate label names are not allowed.");
      }
    }

    const definition = JSON.stringify({
      type,
      description: options.description ?? null,
      unit: options.unit ?? null,
      labelNames: labelNames ?? null,
      maxSeries,
      buckets: type === "histogram" ? [...buckets] : [],
    });

    const existing = this.registrations.get(options.name);

    if (existing) {
      if (existing.definition !== definition) {
        throw new Error(
          `Metric "${options.name}" was registered with a conflicting definition.`,
        );
      }

      return existing;
    }

    const registration: Registration = {
      name: options.name,
      type,
      ...(options.description !== undefined
        ? { description: options.description }
        : {}),
      ...(options.unit !== undefined
        ? { unit: options.unit }
        : {}),
      ...(labelNames !== undefined ? { labelNames } : {}),
      maxSeries,
      buckets: [...buckets],
      definition,
      series: new Map(),
    };

    this.registrations.set(options.name, registration);

    return registration;
  }

  private getSeries(
    registration: Registration,
    labels: MetricLabels,
  ): SeriesState {
    const normalized = this.normalizeLabels(
      registration,
      labels,
    );

    const key = JSON.stringify(normalized);
    const existing = registration.series.get(key);

    if (existing) {
      return existing;
    }

    if (registration.series.size >= registration.maxSeries) {
      throw new Error(
        `Series limit reached for metric "${registration.name}".`,
      );
    }

    const series: SeriesState = {
      labels: normalized,
      value: 0,
      count: 0,
      sum: 0,
      min: null,
      max: null,
      bucketCounts: registration.buckets.map(() => 0),
    };

    registration.series.set(key, series);

    return series;
  }

  private normalizeLabels(
    registration: Registration,
    labels: MetricLabels,
  ): MetricLabels {
    const entries = Object.entries(labels);

    if (registration.labelNames) {
      const actual = entries.map(([key]) => key).sort();

      if (
        actual.length !== registration.labelNames.length ||
        actual.some(
          (name, index) =>
            name !== registration.labelNames![index],
        )
      ) {
        throw new Error(
          `Labels for "${registration.name}" must match: ${
            registration.labelNames.join(", ") || "(none)"
          }.`,
        );
      }
    }

    const normalized: Record<string, string> = {};

    for (const [key, value] of entries.sort(([a], [b]) =>
      a.localeCompare(b),
    )) {
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
        throw new Error(`Invalid label name: ${key}`);
      }

      if (typeof value !== "string") {
        throw new Error(`Label "${key}" must be a string.`);
      }

      normalized[key] = value;
    }

    return Object.freeze(normalized);
  }

  private validateOptions(options: MetricOptions): void {
    if (
      !options ||
      typeof options.name !== "string" ||
      !/^[a-zA-Z_:][a-zA-Z0-9_:]*$/.test(options.name)
    ) {
      throw new Error("Invalid metric name.");
    }

    if (
      options.description !== undefined &&
      typeof options.description !== "string"
    ) {
      throw new Error("Metric description must be a string.");
    }

    if (
      options.unit !== undefined &&
      typeof options.unit !== "string"
    ) {
      throw new Error("Metric unit must be a string.");
    }
  }

  private validateBuckets(buckets: readonly number[]): void {
    if (buckets.length === 0) {
      throw new Error(
        "A histogram must define at least one bucket.",
      );
    }

    let previous = -Infinity;

    for (const bucket of buckets) {
      if (!Number.isFinite(bucket) || bucket <= previous) {
        throw new Error(
          "Histogram buckets must be finite and strictly increasing.",
        );
      }

      previous = bucket;
    }
  }

  private assertFinite(value: number, label: string): void {
    if (!Number.isFinite(value)) {
      throw new Error(`${label} must be a finite number.`);
    }
  }

  private assertNonNegative(value: number, label: string): void {
    this.assertFinite(value, label);

    if (value < 0) {
      throw new Error(`${label} cannot be negative.`);
    }
  }
}
