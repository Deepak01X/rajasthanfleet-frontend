"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Fleet", path: "/admin/fleet" },
    { name: "Booking", path: "/admin/booking" },
    { name: "Quotation", path: "/admin/quotation" },
    { name: "Review", path: "/admin/review" },
    { name: "Service Page", path: "/admin/servicepage" },
    { name: "Travel Tips", path: "/admin/TravelTips" },
    { name: "Corporate Quotation", path: "/admin/corporaterequest" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("rfleet_admin_token"); // ✅ JWT token remove kare
    router.push("/admin/login"); // ✅ redirect to login page
  };

  return (
    <header className="bg-pink-700 text-white shadow-md py-3 px-6 flex flex-wrap items-center justify-between">
      {/* Left Side — Logo / Title */}
      <h1
        className="text-2xl font-bold cursor-pointer hover:opacity-90 transition-all"
        onClick={() => router.push("/admin")}
      >
        🛠️ Rajasthan Fleet — Admin Panel
      </h1>

      {/* Right Side — Menu & Logout */}
      <nav className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="secondary"
            className="bg-white text-pink-700 hover:bg-pink-100 text-sm font-medium transition-all"
            onClick={() => router.push(item.path)}
          >
            {item.name}
          </Button>
        ))}

        {/* 🚪 Logout Button */}
        <Button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium ml-2"
        >
          Logout
        </Button>
      </nav>
    </header>
  );
}
