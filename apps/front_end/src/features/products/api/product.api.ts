// src/features/products/api/product.api.ts

import { axiosInstance } from "@/infra/http";

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
  const { data } =
    await axiosInstance.get<Product[]>(
      "/api/products/"
    );

  return data;
};

export const getProductByIdApi = async (
  id: number
): Promise<Product> => {
  const { data } =
    await axiosInstance.get<Product>(
      `/api/products/${id}/`
    );

  return data;
};

export const createProductApi = async (
  payload: CreateProductPayload
): Promise<Product> => {
  const { data } =
    await axiosInstance.post<Product>(
      "/api/products/",
      payload
    );

  return data;
};

export const updateProductApi = async (
  id: number,
  payload: Partial<CreateProductPayload>
): Promise<Product> => {
  const { data } =
    await axiosInstance.put<Product>(
      `/api/products/${id}/`,
      payload
    );

  return data;
};

export const deleteProductApi = async (
  id: number
): Promise<void> => {
  await axiosInstance.delete(
    `/api/products/${id}/`
  );
};