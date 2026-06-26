import { apiGateway } from "@/infra/http/gateway/apiGateway";

export const userRepository = {
  getProfile: <TResponse>(
    endpoint: string
  ) =>
    apiGateway.get<TResponse>(
      endpoint
    ),

  updateProfile: <TRequest, TResponse>(
    endpoint: string,
    payload: TRequest
  ) =>
    apiGateway.put<TResponse,TRequest>(
      endpoint,
      payload
    ),

  deleteAccount: (
    endpoint: string
  ) =>
    apiGateway.delete(endpoint),
};