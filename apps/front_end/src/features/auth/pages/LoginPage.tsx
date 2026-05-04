import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/features/auth/hooks/useAuthQueries";

export default function LoginPage() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    login(
      { username, password }, // adjust if backend expects "username"
      {
        onSuccess: () => {
          navigate("/dashboard", { replace: true });
        },
        onError: () => {
          setError("Invalid username or password");
        },
      }
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] top-[-120px] left-[-120px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] bottom-[-120px] right-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] top-[30%] left-[40%]" />
      </div>

      {/* TOP BUTTONS */}
      <div className="absolute top-5 left-5 flex gap-3 z-20">

        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
        >
          🏠 Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition"
        >
          ❌ Cancel
        </button>

      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md mx-4">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

          <h1 className="text-3xl font-bold text-white text-center">
            Welcome Back
          </h1>

          <p className="text-center text-white/60 mt-2 mb-6">
            Login to your account
          </p>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-center mb-3">{error}</p>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition font-semibold text-white disabled:opacity-50"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>

          </form>

          {/* LINKS */}
          <div className="mt-6 flex justify-between text-sm text-white/60">
            <span className="hover:text-white cursor-pointer">
              Forgot password?
            </span>

            <span className="hover:text-white cursor-pointer">
              Create account
            </span>
          </div>

        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          © 2026 SaaS Store. All rights reserved.
        </p>

      </div>
    </div>
  );
}