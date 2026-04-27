import React from "react"

export default function Hero({
  backgroundImage,
  children,
}: {
  backgroundImage?: string
  children?: React.ReactNode
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        minHeight: "320px",
        borderRadius: "0px",
        background: backgroundImage
          ? `url(${backgroundImage}) center / cover no-repeat`
          : "#111",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "white",
          padding: "40px",
        }}
      >
        {children || <h2>Hero Section</h2>}
      </div>
    </div>
  )
}