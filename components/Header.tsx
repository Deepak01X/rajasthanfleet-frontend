"use client";
import Image from "next/image";
import { Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
  {/* Replace /logo.png with your actual logo file name in /public folder */}
    <img
    src="/logo7.png"  // 🔹 Apna logo public folder me daal, e.g. public/logo.png
    alt="Rajasthan Fleet Logo"
    className="w-90 h-20 rounded-full object-cover" // 🔹 Size & shape yahan se change kar sakta hai
  />
 
</div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="/services" className="text-muted-foreground hover:text-primary transition-colors">
            Services
          </a>
          <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Facebook className="w-5 h-5 text-primary" />
          <Button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-glow">
            Book Now
          </Button>
        </div>
      </div>
    </nav>
  );
}
