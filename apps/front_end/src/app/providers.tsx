import { ReactNode } from "react";
import { AuthProvider } from "@/features/auth/app/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";



type ProvidersProps = {
  children: ReactNode;
};

// create query client ONCE
const queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
  );
}