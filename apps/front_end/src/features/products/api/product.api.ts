// src/features/products/api/product.api.ts
import { httpClient } from "@/infra/http/httpClient";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
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
  image: string; // cloudinary URL
};

// ─────────────────────────────────────────
// API FUNCTIONS
// ─────────────────────────────────────────
export const getProductsApi = async (): Promise<Product[]> => {
  const res = await httpClient.get("/api/products/");
  return res.data;
};

export const getProductByIdApi = async (id: number): Promise<Product> => {
  const res = await httpClient.get(`/api/products/${id}/`);
  return res.data;
};

export const createProductApi = async (
  payload: CreateProductPayload
): Promise<Product> => {
  const res = await httpClient.post("/api/products/", payload);
  return res.data;
};

export const updateProductApi = async (
  id: number,
  payload: Partial<CreateProductPayload>
): Promise<Product> => {
  const res = await httpClient.put(`/api/products/${id}/`, payload);
  return res.data;
};

export const deleteProductApi = async (id: number): Promise<void> => {
  await httpClient.delete(`/api/products/${id}/`);
};