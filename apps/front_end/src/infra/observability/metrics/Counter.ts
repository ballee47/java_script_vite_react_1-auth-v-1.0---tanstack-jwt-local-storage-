
import type {
  MetricLabels,
} from "./types/MetricTypes";

export interface Counter {
  increment(
    value?: number,
    labels?: MetricLabels,
  ): void;
}
