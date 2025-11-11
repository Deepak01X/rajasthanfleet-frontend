"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border overflow-hidden">
      <div
  className="
    mx-auto
    w-full
    max-w-[1300px]
    px-6 sm:px-8 md:px-10
    py-2
    flex items-center justify-between
  "
>

        {/* ---------- Left: Logo ---------- */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo7.png"
            alt="Rajasthan Fleet Logo"
            className="w-28 h-auto sm:w-32 md:w-36 object-contain"
          />
        </div>

        {/* ---------- Center: Nav Links (hidden on mobile) ---------- */}
        <div className="hidden md:flex items-center space-x-8 text-[16px]">
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

        {/* ---------- Right: Social Icons + Book Now ---------- */}
        <div
          className="
            flex items-center gap-3 sm:gap-4 
            justify-end 
            flex-nowrap
          "
        >
          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61582597211874"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
              alt="Facebook"
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/rajasthanfleet/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm"
            />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919119373381?text=Hello%20Rajasthan%20Fleet!%20I%20want%20to%20book%20a%20ride."
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
          </a>

          {/* Book Now Button */}
          <a href="/services" className="ml-2">
           <Button
  className="bg-transparent border-2 border-primary text-primary 
             hover:bg-primary hover:text-primary-foreground 
             hover-glow px-4 py-[6px] text-[14px] sm:text-[15px] 
             font-medium rounded-lg whitespace-nowrap transition-all duration-300"
>
  Book Now
</Button>

          </a>
        </div>
      </div>
    </nav>
  );
}
