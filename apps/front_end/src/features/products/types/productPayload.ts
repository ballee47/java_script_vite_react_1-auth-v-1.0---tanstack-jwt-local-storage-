// src/features/products/types/productPayload.ts

export interface CreateProductPayload {
  name: string;
  price: number;
  description?: string;
  image: string;
}

export interface UpdateProductPayload
  extends Partial<CreateProductPayload> {}