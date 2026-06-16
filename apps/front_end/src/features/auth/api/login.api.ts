// src/features/auth/api/login.api.ts
import { AxiosResponse } from "axios";
import { httpClient } from "@/infra/http/httpClient";
import { tokenStorage } from "@/infra/storage/localStorage";
import { setupInterceptors } from "@/infra/http/setupInterceptors";

setupInterceptors(); // <-- IMPORTANT (run once at app bootstrap ideally)

// ─────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────
export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
};

export const loginApi = async (payload: LoginPayload) => {
  const res = await httpClient.post(
    "/api/token/",
    payload,
    {
      withCredentials: true, // 🔥 VERY IMPORTANT for cookies
    }
  );

  return res.data;
};

// ─────────────────────────────────────────
// FETCH CURRENT USER
// ─────────────────────────────────────────
export type MeResponse = {
  id: number;
  username: string;
  email: string;
};

export const fetchMeApi = async (): Promise<MeResponse> => {
  const res: AxiosResponse<MeResponse> =
    await httpClient.get<MeResponse>("/api/me/");

  return res.data;
};

// ─────────────────────────────────────────
// SIGNUP
// ─────────────────────────────────────────
export type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

export const signupApi = async (
  payload: SignupPayload
): Promise<void> => {
  await httpClient.post("/api/register/", payload);
};