import { createContext, useState, ReactNode } from "react"

type User = {
  username: string
  email?: string
}

type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (user: User) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}