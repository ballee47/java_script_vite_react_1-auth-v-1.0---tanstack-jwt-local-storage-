
import type {
  MetricLabels,
} from "./MetricTypes";

export interface Counter {
  increment(
    value?: number,
    labels?: MetricLabels,
  ): void;
}
