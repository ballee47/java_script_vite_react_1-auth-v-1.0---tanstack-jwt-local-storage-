// src/features/auth/pages/SignupPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupApi } from "../api/login.api";       // ✅ use api file
import { useLogin } from "../hooks/useAuthQueries"; // ✅ use hook directly

export default function SignupPage() {
  const navigate = useNavigate();
  const { mutateAsync: loginMutate } = useLogin(); // ✅ mutateAsync for awaiting

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // ✅ step 1 — signup
      await signupApi({ username, email, password });

      // ✅ step 2 — auto login and wait for it fully
      await loginMutate({ username, password });

      // ✅ step 3 — wait for AuthContext + useMe to update
      await new Promise((resolve) => setTimeout(resolve, 300));

      // ✅ step 4 — redirect to dashboard
      navigate("/dashboard", { replace: true });

    } catch (err: any) {
      console.error("FULL ERROR:", err?.response?.data);
      const message = err?.response?.data?.message || "Signup failed. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] top-[-120px] left-[-120px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] bottom-[-120px] right-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] top-[30%] left-[40%]" />
      </div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

          <h1 className="text-3xl font-bold text-white text-center">
            Create Account
          </h1>

          <p className="text-center text-white/60 mt-2 mb-6">
            Sign up to get started
          </p>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-center mb-3">{error}</p>
          )}

          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

          </form>

          {/* SWITCH TO LOGIN */}
          <p className="text-center text-white/60 text-sm mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-white cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
          >
            Go to Home
          </button>

        </div>
      </div>
    </div>
  );
}