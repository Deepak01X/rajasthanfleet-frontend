"use client";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      console.log("🟣 Checking route:", pathname);

      // ✅ Skip login page
      if (pathname === "/admin/login") {
        setAuthorized(true);
        setChecking(false);
        return;
      }

      // ✅ Immediately block rendering before verifying
      setAuthorized(false);

      const token =
        localStorage.getItem("rfleet_admin_token") ||
        sessionStorage.getItem("rfleet_admin_token");

      if (!token) {
        console.warn("⛔ No token found, redirecting...");
        router.replace("/admin/login");
        setChecking(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Verify response:", res.data);

        if (res.data?.valid === true) {
          setAuthorized(true);
        } else {
          throw new Error("Invalid token");
        }
      } catch (err) {
        console.error("Auth failed:", err);
        localStorage.removeItem("rfleet_admin_token");
        sessionStorage.removeItem("rfleet_admin_token");
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    verifyToken();
  }, [pathname, router]);

  // 🚫 While checking, show loader (no flash)
  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-pink-600 font-semibold">
        Verifying access...
      </div>
    );
  }

  // ✅ Render page only if authorized
  return authorized ? <>{children}</> : null;
}
