"use client";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const sections = [
    { name: "Fleet Management", path: "/admin/fleet" },
    { name: "Bookings", path: "/admin/booking" },
    { name: "Quotations", path: "/admin/quotation" },
    { name: "Contacts", path: "/admin/contact" },
    { name: "Reviews", path: "/admin/review" },
    { name: "Service Page", path: "/admin/servicepage" },
    { name: "Travel Tips", path: "/admin/TravelTips" },
    { name: "Corporate Quotation", path: "/admin/corporaterequest" },
  ];

  // ✅ Fetch username safely after layout verification
  useEffect(() => {
    const token =
      localStorage.getItem("rfleet_admin_token") ||
      sessionStorage.getItem("rfleet_admin_token");

    if (token) {
      axios
        .get(`${API_BASE_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data?.valid && res.data?.user) {
            setUsername(res.data.user);
          }
        })
        .catch((err) => console.error("Verify failed:", err));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 🟣 Admin Header */}
      <AdminHeader />

      {/* 🧭 Dashboard Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-2 text-center text-pink-700">
          🧭 Admin Dashboard
        </h1>
        {username && (
          <p className="text-center text-gray-600 mb-6">
            Welcome back,{" "}
            <span className="font-semibold text-pink-700">{username}</span>
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all cursor-pointer border-pink-300 hover:border-pink-500"
              onClick={() => router.push(section.path)}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <h2 className="text-xl font-semibold mb-3 text-gray-700">
                  {section.name}
                </h2>
                <Button
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                  onClick={() => router.push(section.path)}
                >
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 🟣 Footer */}
      <Footer />
    </div>
  );
}
