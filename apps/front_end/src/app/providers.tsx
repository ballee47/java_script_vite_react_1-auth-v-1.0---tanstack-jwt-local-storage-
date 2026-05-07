// src/app/providers.tsx
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/features/auth/app/AuthProvider";
import { queryClient } from "@/query/client"; // ✅ import from central place

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} /> {/* ✅ inside AuthProvider */}
      </AuthProvider>
    </QueryClientProvider>
  );
}