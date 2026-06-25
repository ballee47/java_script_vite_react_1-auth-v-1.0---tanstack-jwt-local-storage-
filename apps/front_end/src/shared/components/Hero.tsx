import React from "react"
import { AuthContext } from "@/features/auth/context/AuthContext"

export default function Hero({
  backgroundImage,
  children,
}: {
  backgroundImage?: string
  children?: React.ReactNode
}) {
  const authContext = React.useContext(AuthContext)

  const { user, isAuthenticated } = authContext ?? {
    user: undefined,
    isAuthenticated: false,
  }

  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        minHeight: "320px",
        background: backgroundImage
          ? `url(${backgroundImage}) center / cover no-repeat`
          : "#111",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          textAlign: "center",
        }}
      >
        {isAuthenticated ? (
          <>
            <h1
              style={{
                margin: 0,
                fontSize: "2rem",
                fontWeight: 300,
                letterSpacing: "3px",
                textTransform: "uppercase",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              Welcome
            </h1>

            <h2
              style={{
                marginTop: "16px",
                padding: "12px 32px",
                fontSize: "1.5rem",
                fontWeight: 800,
                letterSpacing: "2px",
                borderRadius: "12px",
                backdropFilter: "blur(4px)",
                textShadow: "0 4px 20px rgba(0,0,0,0.6)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
              }}
            >
              {user?.username}
            </h2>
          </>
        ) : (
          children || <h2>Hero Section</h2>
        )}
      </div>
    </div>
  )
}