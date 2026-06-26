// import { apiGateway } from "@/infra/http/gateway/apiGateway";

// /* LOGIN */
// export type LoginPayload = {
//   username: string;
//   password: string;
// };

// export type LoginResponse = {
//   message: string;
// };

// export const loginApi = async (
//   payload: LoginPayload
// ): Promise<LoginResponse> => {
//   return apiGateway.post<LoginResponse, LoginPayload>(
//     "/api/token/",
//     payload,
  
//   );
// };

// /* ME */
// export type MeResponse = {
//   id: number;
//   username: string;
//   email: string;
// };

// export const fetchMeApi = async (): Promise<MeResponse> => {
//   return apiGateway.get<MeResponse>(
//     "/api/me/",
   
//   );
// };

// /* SIGNUP */
// export type SignupPayload = {
//   username: string;
//   email: string;
//   password: string;
// };

// export const signupApi = async (
//   payload: SignupPayload
// ): Promise<void> => {
//   await apiGateway.post<void, SignupPayload>(
//     "/api/register/",
//     payload,
  
//   );
// };