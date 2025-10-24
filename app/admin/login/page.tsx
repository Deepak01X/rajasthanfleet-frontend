"use client";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      console.log("Login Response:", res.data);

      if (res.data?.token) {
        // ✅ Save token based on "Remember me"
        if (remember) {
          localStorage.setItem("rfleet_admin_token", res.data.token);
        } else {
          sessionStorage.setItem("rfleet_admin_token", res.data.token);
        }

        // ✅ Confirm token saved successfully
        const tokenCheck =
          localStorage.getItem("rfleet_admin_token") ||
          sessionStorage.getItem("rfleet_admin_token");

        console.log("Token Saved:", tokenCheck);

        if (tokenCheck) {
          // 🕒 Short delay to ensure layout detects token
          setTimeout(() => {
            router.push("/admin");
          }, 500);
        } else {
          setError("Token not saved properly. Try again.");
        }
      } else {
        setError("No token received. Please check backend response.");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(180deg,#fff0f4,#fff)] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#e11d74]">
            Rajasthan Fleet
          </h1>
          <p className="text-sm text-gray-500 mt-1">Admin Panel — Login</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your admin username"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-400 text-black"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="block w-full px-4 py-2 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-400 text-black"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-gray-600 hover:text-gray-900"
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => alert("Contact admin to reset password")}
              className="text-sm text-pink-600 hover:underline"
            >
              Forgot?
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold shadow hover:from-pink-600 hover:to-pink-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer note */}
        <div className="mt-6 text-center text-xs text-gray-400">
          Protected admin area • Access limited to authorized admins only
        </div>
      </div>
    </div>
  );
}
