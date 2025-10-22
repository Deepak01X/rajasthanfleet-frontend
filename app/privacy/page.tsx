"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#1c1111] text-gray-200 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-[#2a1717]/90 border border-pink-300 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-pink-500 text-center">
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              At <span className="text-pink-400 font-semibold">RajasthanFleet</span>, we value your
              privacy and are committed to protecting your personal data.
            </p>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">1. Information We Collect</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Your name, email, and contact number</li>
              <li>Pickup and drop locations</li>
              <li>Payment details (handled securely)</li>
              <li>Feedback and reviews</li>
            </ul>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">2. How We Use Your Information</h3>
            <p>
              We use the collected information to confirm bookings, send updates, and improve our
              service experience. We never sell or share your information with untrusted third
              parties.
            </p>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">3. Data Protection</h3>
            <p>
              Your data is stored securely and processed only for service-related purposes. We use
              SSL encryption and comply with applicable data protection laws in India.
            </p>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">4. Cookies</h3>
            <p>
              Our website may use cookies to enhance your experience. You may disable cookies in
              your browser settings if you wish.
            </p>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">5. Your Rights</h3>
            <p>
              You can request access, correction, or deletion of your personal data at any time by
              contacting us.
            </p>

            <h3 className="text-xl font-semibold text-pink-400 mt-8">6. Contact</h3>
            <p>
              📧 privacy@rajasthanfleet.com <br />
              📞 +91 9119373381
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
