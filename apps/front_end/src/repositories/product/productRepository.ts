import { apiGateway } from "@/infra/http/gateway/apiGateway";

export const productRepository = {
  getAll: <TResponse>(
    endpoint: string
  ) =>
    apiGateway.get<TResponse>(
      endpoint
    ),

  getById: <TResponse>(
    endpoint: string
  ) =>
    apiGateway.get<TResponse>(
      endpoint
    ),

  create: <TResponse,TRequest>(
    endpoint: string,
    payload: TRequest
  ) =>
    apiGateway.post<TResponse,TRequest>(
      endpoint,
      payload
    ),

  update: <TRequest, TResponse>(
    endpoint: string,
    payload: TRequest
  ) =>
    apiGateway.put<TResponse,TRequest>(
      endpoint,
      payload
    ),

  remove: (
    endpoint: string
  ) =>
    apiGateway.delete(endpoint),
};