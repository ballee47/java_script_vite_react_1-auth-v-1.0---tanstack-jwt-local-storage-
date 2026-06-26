import { authRepository } from "@/repositories/auth";
import { ENDPOINTS } from "@/infra/http/api/endpoints";

export const meApi = <
  TResponse
>() =>
  authRepository.me<TResponse>(
    ENDPOINTS.auth.me
  );