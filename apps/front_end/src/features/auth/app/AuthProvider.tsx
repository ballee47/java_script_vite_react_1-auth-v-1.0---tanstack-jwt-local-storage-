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
    isLoading,
  } = useMe();

  useEffect(() => {
    axiosInstance
      .get(AUTH_ENDPOINTS.CSRF)
      .catch(() => {});
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: Boolean(user),
        isLoadingAuth: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}