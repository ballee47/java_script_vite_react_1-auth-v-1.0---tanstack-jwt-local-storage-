// src/features/auth/app/AuthProvider.tsx
import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMe } from "../hooks/useAuthQueries";
import { tokenStorage } from "@/infra/storage/cookieStorage";
import { axiosInstance } from "@/infra/http/client/axiosInstance";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, data: user } = useMe();

  // ✅ local state — updates instantly when token disappears
  const [isAuthenticated, setIsAuthenticated] = useState(
    tokenStorage.hasAccessToken()
  );

  // ✅ Initialize CSRF token on app load
  useEffect(() => {
    axiosInstance.get("/api/csrf/").catch(() => {
      // CSRF endpoint might fail, but that's okay - token might be set by other means
    });
  }, []);

  // ✅ sync with user data from React Query
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else if (!isLoading) {
      setIsAuthenticated(false);
    }
  }, [user, isLoading]);

  // ✅ loading screen — prevents UI flash on app start
  if (isLoading && tokenStorage.hasAccessToken()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,      // ✅ from local state — updates instantly
        isLoadingAuth: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}