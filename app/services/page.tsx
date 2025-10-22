"use client";

import { useEffect, useState } from "react";
import ServiceSection from "@/components/ServiceSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // ✅ Fetch data from Spring Boot backend
        const res = await fetch("https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/services", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch services from backend");
        }

        const data = await res.json();
        console.log("🔥 Backend Response Data:", data);

        // 🧩 Group data into frontend-friendly structure
        const grouped = data.reduce((acc: any, item: any) => {
          const { category, carName, image, price } = item;
          // ✅ Handle multiple naming styles safely
          const serviceType =
            item.serviceType || item.service_type || item.servicetype || item.type;

          if (!acc[category]) acc[category] = {};

          if (!acc[category][carName]) {
            acc[category][carName] = {
              name: carName,
              image,
              services: [],
            };
          }

          // ✅ Push data safely
          acc[category][carName].services.push({
            type: serviceType || "Service",
            price,
          });

          return acc;
        }, {});

        // ✅ Convert grouped object into array format
        const formatted = Object.entries(grouped).map(([category, cars]) => ({
          category,
          subcategories: Object.values(cars),
        }));

        setServices(formatted);
      } catch (err) {
        console.error("❌ Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-white">
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className="p-12 bg-[#1e1313] min-h-screen text-white">
      {/* 🔹 Header */}
      <Header />

      {/* 🔹 Dynamic service sections */}
      {services.length > 0 ? (
        services.map((item, i) => (
          <ServiceSection
            key={i}
            category={item.category}
            subcategories={item.subcategories}
          />
        ))
      ) : (
        <p className="text-center text-gray-400">
          No services found. Please try again later.
        </p>
      )}

      {/* 🔹 Footer */}
      <Footer />
    </div>
  );
}
