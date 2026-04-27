import { ReactNode } from "react";
import { AuthProvider } from "@/features/auth/app/AuthProvider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}