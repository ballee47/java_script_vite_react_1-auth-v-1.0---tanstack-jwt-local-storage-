
// src/features/products/types/index.ts

export interface Product {
  id: number;
  name: string;
  price: string | number;
  image: string | null;
  description?: string;
  stock?: number;
  created_at?: string;
  category?: {
    id: number;
    image: string | null;
    type: string;
    name: string;
    slug: string | null;
  } | null;
}

export interface CreateProductPayload {
  name: string;
  price: number;
  description?: string;
  image?: string;
  category?: number;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;
