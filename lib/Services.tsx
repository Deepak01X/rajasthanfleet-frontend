// src/lib/Services.tsx
import React from "react";
import ServiceCard from "@/components/ServiceCard";
import {
  MapPin,
  Compass,
  Car,
  Plane,
  Building,
  Calendar,
  Users,
} from "lucide-react";

const services = [
  {
    
    image: "/local1.png",
    Icon: MapPin,
  },
  {
    title: "Across Rajasthan",
    description: "Complete Rajasthan tour covering all major cities and attractions",
    image: "/overraj.jpeg",
    Icon: Compass,
  },
  {
    title: "One Way Trip",
    description: "Direct transportation to your destination without return",
    image: "/one-way.jpg",
    Icon: Car,
  },
  {
   
    image: "/twoway1.png",
    Icon: MapPin,
  },
  {
    title: "Airport Transfer",
    description: "Seamless airport pickups and drops with punctual service",
    image: "/Airport3.jpg",
    Icon: Plane,
  },
  {
    title: "Corporate Travel",
    description: "Professional transportation for business meetings and events",
    image: "/corporate.jpg",
    Icon: Building,
  },
  {
    title: "Wedding Cars",
    description: "Luxury wedding transportation for your special day",
    image: "/wedding.jpg",
    Icon: Calendar,
  },
  {
    title: "Event Shuttles",
    description: "Group transportation for events, conferences, and gatherings",
    image: "/group.jpg",
    Icon: Users,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-balance">
          Our Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
