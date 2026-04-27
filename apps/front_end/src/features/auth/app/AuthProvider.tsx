import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
  loadingAuth: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // 🔥 prevents UI flicker before hydration completes
  const [loadingAuth, setLoadingAuth] = useState(true);

  // 🔄 Hydrate auth once on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }

    setLoadingAuth(false);
  }, []);

  // 🔐 Login
  const login = (username: string, authToken: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", authToken);

    setUser(username);
    setToken(authToken);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loadingAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🧠 Safe hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}