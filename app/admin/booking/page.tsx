"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function formatDate(dateString: string | null) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [driverData, setDriverData] = useState({ name: "", phone: "" });

  // ✅ Fetch Bookings
  useEffect(() => {
    fetch("https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Toggle Payment Status
  const handlePaymentToggle = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "Paid" ? "Unpaid" : "Paid";
    await fetch(`https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/bookings/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStatus),
    });
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, paymentStatus: newStatus } : b
      )
    );
  };

  // ✅ Delete Booking
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    await fetch(`https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/bookings/${id}`, { method: "DELETE" });
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // ✅ Assign Driver
  // ✅ Assign Driver (auto WhatsApp open version)
const handleAssignDriver = async () => {
  if (!selected) return;

  const res = await fetch(
    `https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/bookings/${selected.id}/assign-driver`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        driverName: driverData.name,
        driverPhone: driverData.phone,
      }),
    }
  );

  if (res.ok) {
    alert("✅ Driver assigned successfully!");

    // Update local UI with new driver info
    const updatedBooking = {
      ...selected,
      driverName: driverData.name,
      driverPhone: driverData.phone,
    };

    setBookings((prev) =>
      prev.map((b) => (b.id === selected.id ? updatedBooking : b))
    );
    setSelected(updatedBooking);
    setDriverData({ name: "", phone: "" });

    // ✅ Auto WhatsApp open
    const links = generateWhatsAppLinks(updatedBooking);

    // Optional: open one after another (delay look smooth)
    setTimeout(() => {
      window.open(links.driverLink, "_blank");   // 1️⃣ Opens driver chat
    }, 500);

    setTimeout(() => {
      window.open(links.customerLink, "_blank"); // 2️⃣ Opens customer chat
    }, 2000);
  } else {
    alert("❌ Failed to assign driver");
  }
};

  // ✅ WhatsApp Message Generator
  const generateWhatsAppLinks = (booking: any) => {
  const paymentStatus = booking.paymentStatus || "Unpaid";
  const paymentIcon = paymentStatus === "Paid" ? "✅" : "⚠️";
  const paymentLine =
    paymentStatus === "Paid"
      ? `💰 *Payment:* ${paymentIcon} ${paymentStatus} (Received)`
      : `💰 *Payment:* ${paymentIcon} ${paymentStatus} (Pending)`;


  // 🚗 Message for Driver
  const driverMsg = `🚗 *New Ride Assigned!*

👨‍✈️ *Driver:* ${booking.driverName}
📍 *Pickup:* ${booking.pickup}
🏁 *Drop:* ${booking.drop || "N/A"}
📅 *Date:* ${booking.date}
🕒 *Time:* ${booking.time}
👤 *Customer:* ${booking.name} (${booking.phone})
🧾 *Service:* ${booking.serviceType}
${paymentLine}

🚘 *Car:* ${booking.carName} (${booking.cabType})
🏢 *From:* Rajasthan Fleet`;

  // 🙏 Message for Customer
  const customerMsg = `🙏 *Hello ${booking.name}, your cab is confirmed!*

🚗 *Driver:* ${booking.driverName} (${booking.driverPhone})
🚘 *Car:* ${booking.carName} (${booking.cabType})
📍 *Pickup:* ${booking.pickup}
🏁 *Drop:* ${booking.drop || "N/A"}
📅 *Date:* ${booking.date}
🕒 *Time:* ${booking.time}
${paymentLine}

Thank you for choosing 🌸 *Rajasthan Fleet!* 🌸`;

  return {
    driverLink: `https://wa.me/${booking.driverPhone}?text=${encodeURIComponent(driverMsg)}`,
    customerLink: `https://wa.me/${booking.phone}?text=${encodeURIComponent(customerMsg)}`,
  };
};

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white">
      <AdminHeader />

      <main className="flex-1 p-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-pink-400 mb-8">🚗 Booking Management</h1>

        {loading ? (
          <p className="text-gray-400">Loading bookings...</p>
        ) : (
          <div className="w-full max-w-6xl space-y-6">
            {bookings.map((b) => (
              <Card key={b.id} className="bg-[#2a1a1a] border border-gray-700">
                <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white">
                      {b.name} —{" "}
                      <span className="text-pink-400">{b.bookingType}</span>
                    </h2>
                    <p className="text-gray-300 text-sm">📞 {b.phone} | ✉️ {b.email}</p>
                    <p className="text-gray-400 text-sm">🚘 {b.cabType} — {b.carName}</p>
                    <p className="text-gray-400 text-sm">📍 {b.pickup} → {b.drop}</p>
                    <p className="text-gray-500 text-sm">📅 {formatDate(b.date)} | 🕒 {b.time}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {/* 💸 Payment Toggle */}
                    <span
                      onClick={() => handlePaymentToggle(b.id, b.paymentStatus)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                        b.paymentStatus === "Paid"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => setSelected(b)}>View</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(b.id)}>Delete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* ✅ MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#2a1a1a] rounded-lg p-6 w-full max-w-lg text-sm space-y-3 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">Booking Details</h2>

            <p><strong>Name:</strong> {selected.name}</p>
            <p><strong>Phone:</strong> {selected.phone}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Pickup:</strong> {selected.pickup}</p>
            <p><strong>Drop:</strong> {selected.drop}</p>
            <p><strong>Date:</strong> {formatDate(selected.date)}</p>
            <p><strong>Time:</strong> {selected.time}</p>

            {/* 👨‍✈️ Assign Driver */}
            <div className="border-t border-gray-700 pt-4 mt-3">
              <h3 className="font-semibold text-pink-400 mb-2">Assign Driver</h3>
              <input
                type="text"
                placeholder="Driver Name"
                value={driverData.name}
                onChange={(e) => setDriverData({ ...driverData, name: e.target.value })}
                className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                placeholder="Driver Phone"
                value={driverData.phone}
                onChange={(e) => setDriverData({ ...driverData, phone: e.target.value })}
                className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
              />
              <Button className="bg-green-600 hover:bg-green-700 w-full" onClick={handleAssignDriver}>
                ✅ Assign Driver
              </Button>
            </div>

            {/* 🟢 WhatsApp Links */}
            {selected.driverPhone && (
              <div className="border-t border-gray-700 pt-4 mt-3 space-y-1">
                <p className="font-semibold mb-2">Send WhatsApp:</p>
                <a href={generateWhatsAppLinks(selected).customerLink} target="_blank" className="block text-green-400 underline">
                  📩 Message Customer
                </a>
                <a href={generateWhatsAppLinks(selected).driverLink} target="_blank" className="block text-blue-400 underline">
                  📲 Message Driver
                </a>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <Button onClick={() => setSelected(null)} className="bg-gray-600 hover:bg-gray-700 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
