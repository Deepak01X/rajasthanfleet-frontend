import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";
import { ToastProvider } from "@/components/ui/use-toast";

export const metadata: Metadata = {
  title: "Rajasthan Fleet - Premium Cab Service",
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
    <html lang="en">
      <head>
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </head>
     <body
  className={`dark font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased overflow-x-hidden w-screen max-w-[100vw]`}
  style={{ margin: 0, padding: 0 }}
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

