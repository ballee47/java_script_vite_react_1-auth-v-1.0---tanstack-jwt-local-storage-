import { axiosInstance } from "@/infra/http/client/axiosInstance";
import { AUTH_ENDPOINTS } from "@/infra/http/api/endpoints";

export async function refreshToken(): Promise<void> {
  await axiosInstance.post(
    AUTH_ENDPOINTS.REFRESH
  );
}