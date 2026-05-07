// src/query/keys.ts
export const queryKeys = {
  // products
  products: ["products"] as const,
  product: (id: number) => ["product", id] as const,

  // auth
  me: ["me"] as const,
} as const;