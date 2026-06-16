// src/features/auth/api/login.api.ts

import { AxiosResponse } from "axios";
import { httpClient } from "@/infra/http/httpClient";

/* =====================================================
   LOGIN
   - Backend sets HttpOnly cookies
   - No access/refresh returned to frontend
   ===================================================== */

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  message: string;
};

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res: AxiosResponse<LoginResponse> =
    await httpClient.post<LoginResponse>(
      "/api/token/",
      payload,
      {
        withCredentials: true,
      }
    );

  return res.data;
};

/* =====================================================
   CURRENT USER (SESSION CHECK)
   ===================================================== */

export type MeResponse = {
  id: number;
  username: string;
  email: string;
};

export const fetchMeApi = async (): Promise<MeResponse> => {
  const res: AxiosResponse<MeResponse> =
    await httpClient.get<MeResponse>(
      "/api/me/",
      {
        withCredentials: true,
      }
    );

  return res.data;
};

/* =====================================================
   SIGNUP
   ===================================================== */

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

export const signupApi = async (
  payload: SignupPayload
): Promise<void> => {
  await httpClient.post(
    "/api/register/",
    payload,
    {
      withCredentials: true,
    }
  );
};