"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  MessageSquare,
  Users,
  Baby,
  CreditCard,
} from "lucide-react";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const carFromUrl = searchParams.get("carName");
  const categoryFromUrl = searchParams.get("category");

  const [activeTab, setActiveTab] = useState<"general" | "corporate" | "wedding">("general");
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    cabType: categoryFromUrl ?? "Sedan",
    carName: carFromUrl ?? "",
    serviceType: "",
    notes: "",
    companyName: "",
    companyAddress: "",
    adults: 1,
    children: 0,
    decoration: false,
    paymentOption: "Pay After Service",
  });

  // ✅ Fetch services dynamically from backend for selected car
  useEffect(() => {
    if (carFromUrl) {
      fetch(`https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/services/byCar/${carFromUrl}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const formatted = data.map(
              (s: any) => `${s.serviceType} – ${s.price}`
            );
            setServiceOptions(formatted);
          }
        })
        .catch((err) => console.error("Service fetch error:", err));
    }
  }, [carFromUrl]);

  // ✅ Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      bookingType: activeTab,
      paymentStatus: "Unpaid",
    };

    try {
      const res = await fetch("https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        alert("✅ Booking saved successfully! You'll receive confirmation soon.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          pickup: "",
          drop: "",
          date: "",
          time: "",
          cabType: "Sedan",
          carName: "",
          serviceType: "",
          notes: "",
          companyName: "",
          companyAddress: "",
          adults: 1,
          children: 0,
          decoration: false,
          paymentOption: "Pay After Service",
        });
      } else {
        alert("❌ Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("⚠️ Backend not responding!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-xl p-10 rounded-2xl space-y-6">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
        Book Your Cab 🚖
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-6">
        {["general", "corporate", "wedding"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === tab ? "bg-pink-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-black">
        {/* ---------------- GENERAL TAB ---------------- */}
        {activeTab === "general" && (
          <div className="space-y-6">
            {/* Car Info */}
            <div className="border rounded p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Selected Car Details 🚘</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="cabType"
                  value={formData.cabType}
                  readOnly
                  className="w-full border rounded p-3 bg-gray-100 text-black"
                  placeholder="Car Type"
                />
                <input
                  type="text"
                  name="carName"
                  value={formData.carName}
                  readOnly
                  className="w-full border rounded p-3 bg-gray-100 text-black"
                  placeholder="Car Name"
                />
              </div>
            </div>

            {/* Dynamic Service List */}
            <p className="text-gray-600">Choose from available services 🚖</p>
            <div className="space-y-3 border rounded p-4">
              {serviceOptions.length > 0 ? (
                serviceOptions.map((service) => (
                  <label key={service} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="serviceType"
                      value={service}
                      checked={formData.serviceType === service}
                      onChange={handleChange}
                      required
                    />
                    <span>{service}</span>
                  </label>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Loading services...</p>
              )}
            </div>

            {/* Passenger Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold">Adults</label>
                <div className="flex items-center border rounded p-3">
                  <Users className="w-5 h-5 text-pink-500 mr-2" />
                  <input
                    type="number"
                    name="adults"
                    min="1"
                    value={formData.adults}
                    onChange={handleChange}
                    className="flex-1 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold">Children</label>
                <div className="flex items-center border rounded p-3">
                  <Baby className="w-5 h-5 text-pink-500 mr-2" />
                  <input
                    type="number"
                    name="children"
                    min="0"
                    value={formData.children}
                    onChange={handleChange}
                    className="flex-1 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- CORPORATE TAB ---------------- */}
        {activeTab === "corporate" && (
          <div className="space-y-6">
            <p className="text-gray-600">Corporate packages with monthly billing 🏢</p>
            <div className="space-y-3 border rounded p-4">
              {[
                "Corporate – Sedan Package ₹25,000/month",
                "Corporate – SUV Package ₹40,000/month",
                "Corporate – Tempo Traveller ₹60,000/month",
              ].map((pkg) => (
                <label key={pkg} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="serviceType"
                    value={pkg}
                    checked={formData.serviceType === pkg}
                    onChange={handleChange}
                  />
                  <span>{pkg}</span>
                </label>
              ))}
            </div>

            {/* Company Info */}
            <div>
              <label className="block font-semibold">Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label className="block font-semibold">Company Address</label>
              <input
                type="text"
                name="companyAddress"
                placeholder="Enter company address"
                value={formData.companyAddress}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>
          </div>
        )}

        {/* ---------------- WEDDING TAB ---------------- */}
        {activeTab === "wedding" && (
          <div className="space-y-4">
            <p className="text-gray-600">Luxury wedding cars with decoration 🎉</p>
            <div className="space-y-3 border rounded p-4">
              {["Wedding – Luxury Sedan", "Wedding – Luxury SUV"].map((pkg) => (
                <label key={pkg} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="serviceType"
                    value={pkg}
                    checked={formData.serviceType === pkg}
                    onChange={handleChange}
                  />
                  <span>{pkg}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center space-x-3 border rounded p-4">
              <input
                type="checkbox"
                name="decoration"
                checked={formData.decoration}
                onChange={handleChange}
              />
              <span>Add Car Decoration (₹2000 extra)</span>
            </div>
          </div>
        )}

        {/* ---------------- COMMON FIELDS ---------------- */}
        {[
  { icon: User, name: "name", label: "Full Name", placeholder: "Enter full name" },
  { icon: Phone, name: "phone", label: "Phone", placeholder: "Enter phone number" },
  { icon: Mail, name: "email", label: "Email", placeholder: "Enter email address" },
  { icon: MapPin, name: "pickup", label: "Pickup", placeholder: "Pickup location" },
  // 👇 Drop location only for General & Wedding
  ...(activeTab !== "corporate"
    ? [{ icon: MapPin, name: "drop", label: "Drop", placeholder: "Drop location" }]
    : []),
].map((f) => (
  <div key={f.name}>
    <label className="block font-semibold">{f.label}</label>
    <div className="flex items-center border rounded p-3">
      <f.icon className="w-5 h-5 text-pink-500 mr-2" />
      <input
        type="text"
        name={f.name}
        placeholder={f.placeholder}
        value={(formData as any)[f.name]}
        onChange={handleChange}
        className="flex-1 outline-none"
      />
    </div>
  </div>
))}

        {/* Date, Time, Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold">Date</label>
            <div className="flex items-center border rounded p-3">
              <Calendar className="w-5 h-5 text-pink-500 mr-2" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="flex-1 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold">Time</label>
            <div className="flex items-center border rounded p-3">
              <Clock className="w-5 h-5 text-pink-500 mr-2" />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="flex-1 outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold">Special Requests</label>
          <div className="flex items-center border rounded p-3">
            <MessageSquare className="w-5 h-5 text-pink-500 mr-2" />
            <textarea
              name="notes"
              placeholder="Any special instructions"
              value={formData.notes}
              onChange={handleChange}
              className="flex-1 outline-none"
            />
          </div>
        </div>

        {/* Payment */}
        {activeTab === "general" && (
          <div>
            <label className="block font-semibold">Payment Option</label>
            <div className="border rounded p-4 space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentOption"
                  value="Pay After Service"
                  checked={formData.paymentOption === "Pay After Service"}
                  onChange={handleChange}
                />
                <CreditCard className="w-5 h-5 text-pink-500" />
                <span>Pay After Service</span>
              </label>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition text-lg font-semibold"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
