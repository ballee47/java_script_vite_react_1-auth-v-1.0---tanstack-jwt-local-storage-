import { CATEGORY_ENDPOINTS } from "@/infra/http/api/endpoints";
import { apiGateway } from "@/infra/http/gateway/apiGateway";

export const createCategories = async <TResponse>(data: unknown) => {
  return apiGateway.post<TResponse, unknown>(CATEGORY_ENDPOINTS.CREATE, data);
};

export const getCategories = async <TResponse>() => {
  return apiGateway.get<TResponse>(CATEGORY_ENDPOINTS.LIST);
};
