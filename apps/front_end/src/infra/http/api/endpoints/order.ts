export const ORDER_ENDPOINTS = {
  LIST: "/orders",

  CREATE: "/orders",

  BY_ID: (id: number | string) => `/orders/${id}`,

  CANCEL: (id: number | string) => `/orders/${id}/cancel`,
} as const;