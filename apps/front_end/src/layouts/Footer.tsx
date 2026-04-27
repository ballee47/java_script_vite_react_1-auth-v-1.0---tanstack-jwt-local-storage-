export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        padding: "40px 30px",
        marginTop: "auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {/* BRAND */}
        <div>
          <h2 style={{ marginBottom: "10px", fontSize: "20px" }}>
            🛒 SaaS Store
          </h2>
          <p style={{ opacity: 0.7, maxWidth: "250px", lineHeight: "1.5" }}>
            Modern e-commerce platform built with React & clean architecture.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 style={{ marginBottom: "10px" }}>Quick Links</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <a href="/" style={link}>Home</a>
            <a href="/products" style={link}>Products</a>
            <a href="/cart" style={link}>Cart</a>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 style={{ marginBottom: "10px" }}>Contact</h3>
          <p style={{ opacity: 0.7 }}>support@saasstore.com</p>
          <p style={{ opacity: 0.7 }}>+92 300 0000000</p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        style={{
          marginTop: "30px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
          fontSize: "14px",
          opacity: 0.6,
        }}
      >
        © {new Date().getFullYear()} SaaS Store. All rights reserved.
      </div>
    </footer>
  );
}

const link = {
  color: "white",
  textDecoration: "none",
  opacity: 0.7,
  transition: "0.2s",
};