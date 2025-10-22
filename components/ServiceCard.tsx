"use client";
import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // ✅ Import router for navigation

type ServiceCardProps = {
  title?: string;
  description?: string;
  image?: string;
  Icon?: React.ElementType;
};

export default function ServiceCard({
  title = "",
  description = "",
  image = "",
  Icon,
}: ServiceCardProps) {
  const router = useRouter(); // ✅ Initialize router

  // ✅ Handle Redirect Logic
  const handleRedirect = () => {
    if (title?.toLowerCase().includes("corporate")) {
      router.push("/services/corporate");
    } else {
      router.push("/services");
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Icon Circle */}
      {Icon && (
        <div className="absolute -top-6 z-20 flex items-center justify-center w-14 h-14 bg-white shadow-md rounded-full border border-gray-200">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      )}

      {/* Actual Card */}
      <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl h-80 w-full z-10">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full">
          <div className="absolute bottom-4 left-4 right-4">
            <CardTitle className="text-xl text-white mb-2">{title}</CardTitle>
            <p className="text-gray-200 text-sm mb-4">{description}</p>

            {/* ✅ Button with Safe Redirect */}
            <Button
              onClick={handleRedirect}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {title?.toLowerCase().includes("corporate")
                ? "Corporate"
                : "Book Now"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
