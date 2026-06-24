
// src/features/products/api/product.api.ts

import { apiGateway } from "@/infra/http/gateway/apiGateway";

/* ─────────────────────────────────────────
   TYPES
   ───────────────────────────────────────── */

export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
};

export type CreateProductPayload = {
  name: string;
  price: number;
  description?: string;
  image: string;
};

/* ─────────────────────────────────────────
   API FUNCTIONS
   ───────────────────────────────────────── */

export const getProductsApi = async (): Promise<Product[]> => {
  return apiGateway.get<Product[]>(
    "/api/products/"
  );
};

export const getProductByIdApi = async (
  id: number
): Promise<Product> => {
  return apiGateway.get<Product>(
    `/api/products/${id}/`
  );
};

export const createProductApi = async (
  payload: CreateProductPayload
): Promise<Product> => {
  return apiGateway.post<
    Product,
    CreateProductPayload
  >(
    "/api/products/",
    payload
  );
};

export const updateProductApi = async (
  id: number,
  payload: Partial<CreateProductPayload>
): Promise<Product> => {
  return apiGateway.put<
    Product,
    Partial<CreateProductPayload>
  >(
    `/api/products/${id}/`,
    payload
  );
};

export const deleteProductApi = async (
  id: number
): Promise<void> => {
  await apiGateway.delete<void>(
    `/api/products/${id}/`
  );
};

