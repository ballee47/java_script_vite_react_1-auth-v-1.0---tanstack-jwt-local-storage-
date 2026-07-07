// src/features/products/api/product.api.ts

import { apiGateway } from "@/infra/http/gateway/apiGateway";
import { PRODUCT_ENDPOINTS } from "@/infra/http/api/endpoints/product";

import {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "../types";

/* ─────────────────────────────────────────
   API FUNCTIONS
   ───────────────────────────────────────── */

export const getProductsApi = async (): Promise<Product[]> => {
  return apiGateway.get<Product[]>(
    PRODUCT_ENDPOINTS.LIST
  );
};

export const getProductByIdApi = async (
  id: number
): Promise<Product> => {
  return apiGateway.get<Product>(
    PRODUCT_ENDPOINTS.BY_ID(id)
  );
};

export const createProductApi = async (
  payload: CreateProductPayload
): Promise<Product> => {
  return apiGateway.post<
    Product,
    CreateProductPayload
  >(
    PRODUCT_ENDPOINTS.CREATE,
    payload
  );
};

export const updateProductApi = async (
  id: number,
  payload: UpdateProductPayload
): Promise<Product> => {
  return apiGateway.put<
    Product,
    UpdateProductPayload
  >(
    PRODUCT_ENDPOINTS.UPDATE(id),
    payload
  );
};

export const deleteProductApi = async (
  id: number
): Promise<void> => {
  await apiGateway.delete<void>(
    PRODUCT_ENDPOINTS.DELETE(id)
  );
};