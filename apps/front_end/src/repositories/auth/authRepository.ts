import { apiGateway } from "@/infra/http/gateway/apiGateway";

export const authRepository = {
  login: <TResponse,TRequest>(
    endpoint: string,
    payload: TRequest
  ) =>
    apiGateway.post<TResponse,TRequest>(
      endpoint,
      payload
    ),

  register: <TRequest, TResponse>(
    endpoint: string,
    payload: TRequest
  ) =>
    apiGateway.post<TResponse,TRequest>(
      endpoint,
      payload
    ),

  me: <TResponse>(
    endpoint: string
  ) =>
    apiGateway.get<TResponse>(
      endpoint
    ),

  logout: (
    endpoint: string
  ) =>
    apiGateway.post(endpoint),
};