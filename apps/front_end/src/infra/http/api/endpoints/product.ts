export const PRODUCT_ENDPOINTS = {
  LIST: "/products",
  CREATE: "/products",

  BY_ID: (id: number | string) => `/products/${id}`,

  UPDATE: (id: number | string) => `/products/${id}`,

  DELETE: (id: number | string) => `/products/${id}`,
} as const;