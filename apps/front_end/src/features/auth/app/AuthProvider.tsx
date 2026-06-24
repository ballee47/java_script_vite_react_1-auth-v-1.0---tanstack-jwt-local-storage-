// src/features/auth/app/AuthProvider.tsx

import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMe } from "../hooks/useAuthQueries";
import { axiosInstance } from "@/infra/http/client/axiosInstance";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useMe();

  useEffect(() => {
    axiosInstance
      .get("/api/v1/api/csrf/")
      .catch(() => {});
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: !!user,
        isLoadingAuth: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}