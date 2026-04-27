import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("username")
  );

  const login = (username: string, token: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };
}