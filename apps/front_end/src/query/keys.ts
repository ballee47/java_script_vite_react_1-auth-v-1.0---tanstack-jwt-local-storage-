export const queryKeys = {
  products: ["products"] as const,
  product: (id: number) => ["products", id] as const,

  categories: ["categories"] as const,
};