import { httpClient } from "@/infra/http/client/httpClient";

/* LOGIN */
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
  const data = await httpClient.post<LoginResponse>(
    "/api/token/",
    payload,
    { withCredentials: true }
  );

  return data;
};

/* ME */
export type MeResponse = {
  id: number;
  username: string;
  email: string;
};

export const fetchMeApi = async (): Promise<MeResponse> => {
  const data = await httpClient.get<MeResponse>(
    "/api/me/",
    { withCredentials: true }
  );

  return data;
};

/* SIGNUP */
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
    { withCredentials: true }
  );
};