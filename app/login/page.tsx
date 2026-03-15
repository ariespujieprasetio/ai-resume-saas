"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Email atau password salah");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-neutral-900 relative overflow-hidden">
      {/* HEXAGON BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="hex"
              width="120"
              height="104"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M60 0 L120 30 L120 74 L60 104 L0 74 L0 30 Z"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
      </div>
      {/* LOGO TOP LEFT */}

      <div
        onClick={() => router.push("/")}
        className="absolute top-6 left-8 cursor-pointer hover:opacity-80 transition"
      >
        <img src="/logo/logo-veritik.png" className="h-18 w-auto" />
      </div>

      {/* BACKGROUND GLOW */}

      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-225 h-112.5 bg-blue-500/10 blur-[160px] rounded-full mt-20"></div>
      </div>

      {/* LOGIN CARD */}

      <form
        onSubmit={handleLogin}
        className="relative bg-white/80 backdrop-blur border border-neutral-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10 rounded-2xl w-full max-w-sm mx-6"
      >
        {/* HEADER */}

        <div className="text-center mb-8">
          <img src="/logo/logo-veritik.png" className="h-18 mx-auto mb-4" />

          <h1 className="text-2xl font-semibold tracking-tight">
            Login to Veritik
          </h1>

          <p className="text-neutral-500 text-sm mt-2">
            Access the AI resume screening dashboard
          </p>
        </div>

        {/* EMAIL */}

        <input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full p-3 mb-4 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:opacity-50"
        />

        {/* PASSWORD */}

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="w-full p-3 mb-4 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:opacity-50"
        />

        {/* ERROR */}

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* LOGIN BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-500 hover:to-blue-600 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}

          {loading ? "Signing in..." : "Login"}
        </button>

        {/* DEMO TEXT */}

        <p className="text-neutral-400 text-xs text-center mt-6">
          Demo access available for recruiters
        </p>
      </form>
    </div>
  );
}
