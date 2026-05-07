// src/features/auth/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMe, useLogin, useLogout } from "./useAuthQueries";

export function useAuth() {
  // ✅ global auth state from context
  const { isAuthenticated, isLoadingAuth } = useContext(AuthContext);

  // ✅ server state + actions from React Query
  const { data: user } = useMe();
  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return {
    // state
    user,                // full user object { id, username, email }
    isAuthenticated,     // boolean
    isLoadingAuth,       // true while checking auth on app start
    isLoggingIn,         // true while login request in flight
    isLoggingOut,        // true while logout request in flight

    // actions
    login,
    logout,
  };
}