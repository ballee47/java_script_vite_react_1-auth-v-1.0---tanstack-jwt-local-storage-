import { authRepository } from "@/repositories/auth";
import { ENDPOINTS } from "@/infra/http/api/endpoints";

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
    ENDPOINTS.auth.login,
    payload
  );