export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface CreateProductPayload {
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;
