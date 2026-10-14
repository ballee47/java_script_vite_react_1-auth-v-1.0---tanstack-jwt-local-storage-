import { CATEGORY_ENDPOINTS } from "@/infra/http/api/endpoints";
import { apiGateway } from "@/infra/http/gateway/apiGateway";
import type { Category } from "../types/categories.types";

type CategoryListResponse =
  | Category[]
  | { data?: Category[]; results?: Category[] };

export const createCategories = async <TResponse>(data: unknown) => {
  return apiGateway.post<TResponse, unknown>(CATEGORY_ENDPOINTS.CREATE, data);
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiGateway.get<CategoryListResponse>(
    CATEGORY_ENDPOINTS.LIST,
  );

  if (Array.isArray(response)) return response;
  if (Array.isArray(response.results)) return response.results;
  if (Array.isArray(response.data)) return response.data;

  return [];
};
