import { authRepository } from "@/repositories/auth";
import { ENDPOINTS } from "@/infra/http/api/endpoints";

export const logoutApi = () =>
  authRepository.logout(
    ENDPOINTS.auth.logout
  );