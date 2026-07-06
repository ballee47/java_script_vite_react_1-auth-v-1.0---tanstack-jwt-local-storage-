import { authRepository } from "@/repositories/auth";
import { AUTH_ENDPOINTS } from "@/infra/http/api/endpoints";

export const logoutApi = () =>
  authRepository.logout(
    AUTH_ENDPOINTS.LOGOUT
  );