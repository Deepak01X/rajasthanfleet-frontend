"use client";
import { API_BASE_URL } from "@/lib/apiConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupModal from "@/components/PopupModal";
import { useState } from "react";

export default function CorporateQuotationPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    vehicleType: "",
    duration: "",
    employeeCount: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Backend API endpoint (change this if needed)
      const res = await fetch(`${API_BASE_URL}/api/corporatequotations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // ✅ Success
        setShowPopup(true);
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          vehicleType: "",
          duration: "",
          employeeCount: "",
          message: "",
        });

        // Auto-hide popup after 4 seconds
        setTimeout(() => setShowPopup(false), 4000);
      } else {
        alert("❌ Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting quotation:", err);
      alert("⚠️ Backend not responding!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white relative">
      <PopupModal
  show={showPopup}
  message="✅ Quotation Submitted Successfully!"
  subText="Thank you for reaching out to RajasthanFleet. Our corporate team will contact you within 24 hours."
  type="success"
  onClose={() => setShowPopup(false)}
/>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-16 lg:px-24 pt-24 pb-16">
        <h1 className="text-4xl font-bold text-center mb-4 text-pink-500">
          🧾 Get Your Corporate Quotation
        </h1>
        <p className="text-center text-gray-300 mb-12">
          Fill out the form below and our corporate team will contact you with a
          customized plan within 24 hours.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white text-black p-8 rounded-2xl shadow-2xl space-y-6"
        >
          {/* Company Name */}
          <div>
            <label className="block text-pink-600 font-semibold mb-2">
              🏢 Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
              placeholder="Enter company name"
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-pink-600 font-semibold mb-2">
              👤 Contact Person
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-pink-600 font-semibold mb-2">
                📧 Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-pink-600 font-semibold mb-2">
                📞 Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
                placeholder="Enter contact number"
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-pink-600 font-semibold mb-2">
              🚘 Vehicle Type
            </label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
            >
              <option value="">Select Vehicle Type</option>
              <option value="Sedan">Sedan (Swift Dzire / Etios)</option>
              <option value="SUV">SUV (Innova / Ertiga)</option>
              <option value="Tempo Traveller">Tempo Traveller</option>
              <option value="Luxury Car">Luxury Car</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-pink-600 font-semibold mb-2">
              📅 Duration
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
            >
              <option value="">Select Duration</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          {/* Employee Count */}
          <div>
            <label className="block text-pink-600 font-semibold mb-2">
              👥 Approx. No. of Employees
            </label>
            <input
              type="number"
              name="employeeCount"
              value={formData.employeeCount}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
              placeholder="e.g., 25"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-pink-600 font-semibold mb-2">
              📝 Additional Notes
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
              placeholder="Write any custom requirements..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
              } text-white py-3 rounded-lg font-semibold text-lg shadow-md transition-transform transform hover:scale-105`}
            >
              {loading ? "Submitting..." : "Submit Quotation Request 🚀"}
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
