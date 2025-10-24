"use client";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookingId = searchParams.get("bookingId");
  const amount = searchParams.get("amount") || "500";

  const [isPaying, setIsPaying] = useState(false);

  const handlePayment = async () => {
    setIsPaying(true);

    try {
      // 💳 Simulate payment process (you can later integrate Razorpay / Paytm)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ✅ After successful payment
      alert("✅ Payment of ₹" + amount + " successful!");
      
      // Optionally update payment status in backend
      await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/updatePayment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: "Paid" }),
      });

      // Redirect back to confirmation page or home
      router.push(`/booking-success?bookingId=${bookingId}`);
    } catch (err) {
      console.error("Payment failed:", err);
      alert("❌ Payment failed, please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-pink-300 text-gray-900 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center space-y-6">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">Secure Payment 💳</h2>

        <p className="text-gray-700 font-medium">
          Booking ID: <span className="font-semibold">{bookingId}</span>
        </p>
        <p className="text-xl font-bold text-green-600">
          Amount to Pay: ₹{amount}
        </p>

        <div className="mt-6">
          <p className="text-gray-600 text-sm mb-4">
            You are paying a small advance to confirm your booking.  
            Remaining amount can be paid after your trip.
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={isPaying}
          className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition ${
            isPaying
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {isPaying ? "Processing Payment..." : "Pay ₹" + amount + " Now"}
        </button>

        <p
          onClick={() => router.push("/booking")}
          className="text-sm text-blue-500 underline cursor-pointer mt-4"
        >
          ← Go Back to Booking Page
        </p>
      </div>
    </div>
  );
}
