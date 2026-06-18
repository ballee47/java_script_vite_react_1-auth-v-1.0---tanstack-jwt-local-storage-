import { apiGateway } from "@/infra/http/gateway/apiGateway";
import { ENDPOINTS } from "@/infra/http/api/endpoints";
import type { User } from "@/features/auth/types/auth.dto";

export class AuthRepository {
  me() {
    return apiGateway.get<User>(ENDPOINTS.auth.me);
  }
}