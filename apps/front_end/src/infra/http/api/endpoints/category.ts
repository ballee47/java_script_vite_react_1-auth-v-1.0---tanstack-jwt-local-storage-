export const CATEGORY_ENDPOINTS = {
  LIST: "/categories",

  CREATE: "/categories",

  BY_ID: (id: number | string) => `/categories/${id}`,
} as const;