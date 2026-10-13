
import type {
  MetricLabels,
} from "./types/MetricTypes";

export interface Histogram {
  observe(
    value: number,
    labels?: MetricLabels,
  ): void;
}
