import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Providers from "./providers";
import "@/index.css";

import { setupInterceptors } from "@/infra/http";

setupInterceptors(); // <-- IMPORTANT

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found in index.html");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);