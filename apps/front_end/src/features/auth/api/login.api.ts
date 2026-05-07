// src/features/auth/api/login.api.ts
import { httpClient } from "@/infra/http/httpClient";

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

export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await httpClient.post("/api/token/", payload);
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
  const res = await httpClient.get("/api/me/");
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

export const signupApi = async (payload: SignupPayload): Promise<void> => {
  await httpClient.post("/api/register/", payload);
};