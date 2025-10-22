"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CorporateServicePage() {
  const router = useRouter();

  const handleBooking = () => {
    router.push("/booking?serviceType=corporate");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-16 lg:px-24 pt-24 pb-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-6">
              🏢 Corporate Travel Services
            </h1>
            <p className="text-gray-300 leading-relaxed">
              Rajasthan Rovers offers reliable, comfortable, and professional
              travel solutions for businesses. From daily staff commutes to VIP
              client pickups, our packages are tailored for corporate needs.
            </p>
            <button
              onClick={handleBooking}
              className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md"
            >
              Get Corporate Quote
            </button>
          </div>
          <div className="relative w-full h-72 lg:h-96">
            <Image
              src="/topcorporate1.png"
              alt="Corporate Travel"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Fleet Section */}
        <h2 className="text-3xl font-bold text-center mb-8">🚘 Our Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sedan */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-black">
            <Image
              src="/swift.png"
              alt="Sedan"
              width={400}
              height={250}
              className="object-contain w-full h-48 bg-gray-100"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                Sedan (Swift Dzire / Etios)
              </h2>
              <p className="text-gray-700">
                Perfect for daily commutes and business trips.
              </p>
              <p className="mt-2 font-semibold text-pink-600">
                From ₹25,000/month
              </p>
            </div>
          </div>

          {/* SUV */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-black">
            <Image
              src="/innova.png"
              alt="SUV"
              width={400}
              height={250}
              className="object-contain w-full h-48 bg-gray-100"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                SUV (Innova / Ertiga)
              </h2>
              <p className="text-gray-700">
                Ideal for client pickups and intercity corporate travel.
              </p>
              <p className="mt-2 font-semibold text-pink-600">
                From ₹40,000/month
              </p>
            </div>
          </div>

          {/* Tempo Traveller */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-black">
            <Image
              src="/tempo-12.png"
              alt="Tempo Traveller"
              width={400}
              height={250}
              className="object-contain w-full h-48 bg-gray-100"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Tempo Traveller</h2>
              <p className="text-gray-700">
                Best for bulk employee transport & corporate events.
              </p>
              <p className="mt-2 font-semibold text-pink-600">
                From ₹60,000/month
              </p>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-6">🌟 Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white/10 rounded-lg">
              <h3 className="font-semibold mb-2">⏰ 24/7 Availability</h3>
              <p className="text-gray-300">
                Always ready when your business needs us.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg">
              <h3 className="font-semibold mb-2">👨‍💼 Dedicated Manager</h3>
              <p className="text-gray-300">
                Single point of contact for smooth operations.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg">
              <h3 className="font-semibold mb-2">💳 Flexible Payments</h3>
              <p className="text-gray-300">
                Monthly or quarterly billing available.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg">
              <h3 className="font-semibold mb-2">📍 Live Tracking</h3>
              <p className="text-gray-300">
                Track rides and ensure employee safety.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-6">💼 Corporate Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white text-black rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Basic Plan</h3>
              <p className="mb-2">For small teams & startups</p>
              <p className="text-pink-600 font-bold text-xl">₹25,000/month</p>
            </div>
            <div className="p-6 bg-white text-black rounded-lg shadow-lg border-2 border-pink-500">
              <h3 className="font-bold text-lg mb-2">Standard Plan</h3>
              <p className="mb-2">For mid-size businesses</p>
              <p className="text-pink-600 font-bold text-xl">₹40,000/month</p>
            </div>
            <div className="p-6 bg-white text-black rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Premium Plan</h3>
              <p className="mb-2">For large enterprises</p>
              <p className="text-pink-600 font-bold text-xl">₹60,000/month</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-6">✨ Why Choose Us?</h2>
            <ul className="space-y-4 text-gray-300">
              <li>✔ Professional chauffeurs with corporate etiquette</li>
              <li>✔ Monthly billing with detailed receipts (Non-GST)</li>
              <li>✔ 24/7 customer support</li>
              <li>✔ On-time guaranteed pickups</li>
            </ul>
          </div>
          <div className="relative w-full h-72">
            <Image
              src="/whyuscorporate.png"
              alt="Why Choose Us"
              fill
              className="object-contain"
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-6">🚀 How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/10 rounded-lg">
              <h3 className="font-semibold mb-2">1️⃣ Select Package</h3>
              <p className="text-gray-300">
                Choose a plan that suits your company.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg">
              <h3 className="font-semibold mb-2">2️⃣ Get Confirmation</h3>
              <p className="text-gray-300">
                Receive instant booking confirmation & receipt.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg">
              <h3 className="font-semibold mb-2">3️⃣ Ride Hassle-Free</h3>
              <p className="text-gray-300">
                Enjoy reliable premium corporate travel.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-6">💬 What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white/10 rounded-lg">
              <p className="text-gray-300 italic">
                "Rajasthan Rovers made our daily staff transport smooth and
                reliable. Always on time!"
              </p>
              <p className="mt-2 font-semibold">— Startup Founder</p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg">
              <p className="text-gray-300 italic">
                "Their corporate package is cost-effective and hassle-free. Highly recommended."
              </p>
              <p className="mt-2 font-semibold">— HR Manager</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-6">❓ FAQs</h2>
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="font-semibold">
                  Can we get a monthly invoice?
                </h3>
                <p>✅ Yes, detailed receipts are provided monthly (Non-GST).</p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Do you provide luxury cars for corporate events?
                </h3>
                <p>✅ Absolutely, we arrange premium cars for VIP clients.</p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Can packages be customized?
                </h3>
                <p>✅ Yes, tailored solutions are available.</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-72">
            <Image
              src="/FandQ.png"
              alt="FAQ Illustration"
              fill
              className="object-contain"
            />
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <button
            onClick={handleBooking}
            className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-lg text-lg font-semibold shadow-md"
          >
            Get a Custom Corporate Quote 🚖
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
