
import type {
  MetricLabels,
} from "./MetricTypes";

export interface Histogram {
  observe(
    value: number,
    labels?: MetricLabels,
  ): void;
}
