
export type MetricName = string;

export type MetricType = "counter" | "gauge" | "histogram";

export type MetricLabels = Readonly<Record<string, string>>;

export interface MetricOptions {
  readonly name: MetricName;
  readonly description?: string;
  readonly unit?: string;
  readonly labelNames?: readonly string[];
  readonly maxSeries?: number;
}

export interface HistogramOptions extends MetricOptions {
  readonly buckets?: readonly number[];
}

export interface MetricSeriesSnapshot {
  readonly labels: MetricLabels;
}

export interface CounterSeriesSnapshot extends MetricSeriesSnapshot {
  readonly value: number;
}

export interface GaugeSeriesSnapshot extends MetricSeriesSnapshot {
  readonly value: number;
}

export interface HistogramSeriesSnapshot extends MetricSeriesSnapshot {
  readonly count: number;
  readonly sum: number;
  readonly min: number | null;
  readonly max: number | null;
  readonly buckets: Readonly<Record<string, number>>;
}

export interface MetricSnapshot {
  readonly name: MetricName;
  readonly type: MetricType;
  readonly description?: string;
  readonly unit?: string;
  readonly series: readonly (
    | CounterSeriesSnapshot
    | GaugeSeriesSnapshot
    | HistogramSeriesSnapshot
  )[];
}

export interface MetricsSnapshot {
  readonly timestamp: number;
  readonly metrics: readonly MetricSnapshot[];
}

export interface MetricsOptions {
  readonly defaultMaxSeries?: number;
}
