import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";
import { ToastProvider } from "@/components/ui/use-toast";

export const metadata: Metadata = {
  title: "Welcome Rajasthan - Premium Taxi Services",
  description:
    "Your adventure across Rajasthan starts with a click. Professional taxi booking services for tourism in the land of kings.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ToastProvider>
          <Suspense>
            {children}
            <Analytics />
          </Suspense>
        </ToastProvider>
      </body>
    </html>
  );
}
