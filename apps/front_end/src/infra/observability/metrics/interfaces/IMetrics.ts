
import type { Counter } from "../Counter";
import type { Gauge } from "../Gauge";
import type { Histogram } from "../Histogram";

import type {
  HistogramOptions,
  MetricOptions,
  MetricsSnapshot,
} from "../types/MetricTypes";

export interface IMetrics {
  createCounter(options: MetricOptions): Counter;

  createGauge(options: MetricOptions): Gauge;

  createHistogram(options: HistogramOptions): Histogram;

  getSnapshot(): MetricsSnapshot;

  reset(): void;
}
