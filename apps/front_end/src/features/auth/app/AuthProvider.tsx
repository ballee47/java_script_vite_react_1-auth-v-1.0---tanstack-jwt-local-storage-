// src/features/auth/app/AuthProvider.tsx

import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMe } from "../hooks/useAuthQueries";
import { axiosInstance } from "@/infra/http/client/axiosInstance";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const {
    data: user,
    isLoading,
  } = useMe();

  // Initialize CSRF cookie once when app starts
  useEffect(() => {
    axiosInstance.get("/api/v1/api/csrf/").catch(() => {});
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