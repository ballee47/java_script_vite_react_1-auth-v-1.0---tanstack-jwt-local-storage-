
import type {
  MetricLabels,
} from "./MetricTypes";

export interface Gauge {
  set(
    value: number,
    labels?: MetricLabels,
  ): void;

  increment(
    value?: number,
    labels?: MetricLabels,
  ): void;

  decrement(
    value?: number,
    labels?: MetricLabels,
  ): void;
}
