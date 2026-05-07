// src/app/App.tsx
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/routes";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes /> {/* ✅ no Providers here — already in main.tsx */}
    </BrowserRouter>
  );
}