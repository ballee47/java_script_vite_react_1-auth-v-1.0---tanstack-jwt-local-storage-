import { authRepository } from "@/repositories/auth";
import { AUTH_ENDPOINTS } from "@/infra/http/api/endpoints";

export const meApi = <
  TResponse
>() =>
  authRepository.me<TResponse>(
    AUTH_ENDPOINTS.ME
  );