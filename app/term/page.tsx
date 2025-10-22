"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#1c1111] text-gray-200 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-[#2a1717]/90 border border-pink-300 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-pink-500 text-center">
              Terms & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              Welcome to <span className="text-pink-400 font-semibold">RajasthanFleet</span>.
              By booking a cab or using our services, you agree to the terms below.
            </p>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">1. Booking & Payment</h3>
            <p>
              All bookings are subject to availability. Payments can be made online or directly to
              the driver. Prices shown during booking are indicative and may vary due to traffic,
              waiting time, or route changes.
            </p>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">2. Cancellation Policy</h3>
            <p>
              Cancellations made 24 hours prior to the trip are eligible for a full refund. Late
              cancellations may incur fees. Refunds are processed within 5–7 business days.
            </p>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">3. Passenger Responsibilities</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Carry a valid ID proof during the journey.</li>
              <li>No smoking or alcohol consumption inside the cab.</li>
              <li>Any damage to the vehicle will be chargeable to the passenger.</li>
            </ul>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">4. Liability</h3>
            <p>
              RajasthanFleet is not liable for delays due to traffic, weather, or breakdowns, nor
              for any lost belongings left in the vehicle.
            </p>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">5. Policy Changes</h3>
            <p>
              RajasthanFleet reserves the right to modify these terms anytime. Updated versions
              will be posted on this page.
            </p>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">6. Contact</h3>
            <p>
              📧 info@rajasthanfleet.com <br />
              📞 +91 9119373381
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
