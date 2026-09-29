
import { useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { useMe } from "../hooks/useAuthQueries";

import { axiosInstance } from "@/infra/http/client/axiosInstance";
import { AUTH_ENDPOINTS } from "@/infra/http/api/endpoints";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const {
    data: user,
    isLoading: isLoadingAuth,
  } = useMe();

  useEffect(() => {
    axiosInstance
      .get(AUTH_ENDPOINTS.CSRF)
      .catch(() => {
        // CSRF initialization failure is handled by HTTP/security layer
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: Boolean(user),
        isLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

