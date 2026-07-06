import { apiGateway } from "@/infra/http/gateway/apiGateway";
import { AUTH_ENDPOINTS } from "@/infra/http/api/endpoints";

export const authGateway = {
  login: <TResponse, TRequest>(credentials: TRequest) =>
    apiGateway.post<TResponse, TRequest>(
      AUTH_ENDPOINTS.LOGIN,
      credentials
    ),

  me: <TResponse>() =>
    apiGateway.get<TResponse>(
      AUTH_ENDPOINTS.ME
    ),

  register: <TResponse, TRequest>(data: TRequest) =>
    apiGateway.post<TResponse, TRequest>(
      AUTH_ENDPOINTS.REGISTER,
      data
    ),

  logout: <TResponse>() =>
    apiGateway.post<TResponse, undefined>(
      AUTH_ENDPOINTS.LOGOUT
    ),

  refresh: <TResponse>() =>
    apiGateway.post<TResponse, undefined>(
      AUTH_ENDPOINTS.REFRESH
    ),
};