
export const MetricNames = {
  HTTP_REQUESTS_TOTAL: "http_requests_total",
  HTTP_REQUEST_DURATION_SECONDS: "http_request_duration_seconds",
  HTTP_ERRORS_TOTAL: "http_errors_total",

  DATABASE_QUERIES_TOTAL: "database_queries_total",
  DATABASE_QUERY_DURATION_SECONDS:
    "database_query_duration_seconds",
  DATABASE_CONNECTIONS_ACTIVE: "database_connections_active",

  PROCESS_MEMORY_USAGE_BYTES: "process_memory_usage_bytes",
  PROCESS_UPTIME_SECONDS: "process_uptime_seconds",

  JOBS_QUEUED: "jobs_queued",
  JOBS_PROCESSED_TOTAL: "jobs_processed_total",
} as const;

export type StandardMetricName =
  (typeof MetricNames)[keyof typeof MetricNames];
