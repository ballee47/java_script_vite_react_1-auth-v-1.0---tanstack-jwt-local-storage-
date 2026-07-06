import { authRepository } from "@/repositories/auth";
import { AUTH_ENDPOINTS } from "@/infra/http/api/endpoints";

export const loginApi = <
  TRequest,
  TResponse
>(
  payload: TRequest
) =>
  authRepository.login<
    TRequest,
    TResponse
  >(
    AUTH_ENDPOINTS.LOGIN,
    payload
  );