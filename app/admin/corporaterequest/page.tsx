"use client";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useEffect, useState } from "react";
import Header from "@/components/AdminHeader";
import Footer from "@/components/Footer";

export default function AdminCorporateQuotations() {
  const [quotations, setQuotations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Fetch quotations from backend
  const fetchQuotations = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/corporatequotations`);
      if (!res.ok) throw new Error("Failed to fetch quotations");
      const data = await res.json();
      setQuotations(data);
    } catch (err: any) {
      console.error("Error fetching quotations:", err);
      setError("⚠️ Unable to fetch data from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  // ✅ Delete function
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quotation?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/corporatequotations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("✅ Quotation deleted successfully!");
        fetchQuotations();
      } else {
        alert("❌ Failed to delete quotation.");
      }
    } catch (err) {
      console.error("Error deleting:", err);
      alert("⚠️ Backend not responding!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white relative">
      {/* Popup for view details */}
      {showPopup && selectedQuote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white text-black w-full max-w-lg rounded-2xl p-6 relative shadow-2xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-md hover:bg-pink-600"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
              Quotation Details
            </h2>
            <div className="space-y-3">
              <p>
                <strong>🏢 Company:</strong> {selectedQuote.companyName}
              </p>
              <p>
                <strong>👤 Contact:</strong> {selectedQuote.contactPerson}
              </p>
              <p>
                <strong>📧 Email:</strong> {selectedQuote.email}
              </p>
              <p>
                <strong>📞 Phone:</strong> {selectedQuote.phone}
              </p>
              <p>
                <strong>🚘 Vehicle:</strong> {selectedQuote.vehicleType}
              </p>
              <p>
                <strong>📅 Duration:</strong> {selectedQuote.duration}
              </p>
              <p>
                <strong>👥 Employees:</strong> {selectedQuote.employeeCount}
              </p>
              <p>
                <strong>📝 Message:</strong>{" "}
                {selectedQuote.message || "No additional notes."}
              </p>
              <p>
                <strong>🕒 Submitted On:</strong>{" "}
                {selectedQuote.createdAt
                  ? new Date(selectedQuote.createdAt).toLocaleString()
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 px-6 md:px-12 lg:px-24 pt-24 pb-16">
        <h1 className="text-4xl font-bold text-center mb-10 text-pink-500">
          🧾 Corporate Quotation Requests (Admin)
        </h1>

        {loading && (
          <p className="text-center text-gray-300">Loading quotations...</p>
        )}
        {error && (
          <p className="text-center text-red-400 text-lg font-semibold">
            {error}
          </p>
        )}

        {!loading && !error && quotations.length === 0 && (
          <p className="text-center text-gray-400">
            No quotation requests found.
          </p>
        )}

        {!loading && quotations.length > 0 && (
          <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-700">
            <table className="w-full border-collapse">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Company Name</th>
                  <th className="p-3 text-left">Contact Person</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Vehicle Type</th>
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white text-black">
                {quotations.map((q, index) => (
                  <tr
                    key={q.id || index}
                    className="border-b border-gray-200 hover:bg-pink-50 transition"
                  >
                    <td className="p-3 font-semibold text-pink-600">
                      {index + 1}
                    </td>
                    <td className="p-3">{q.companyName}</td>
                    <td className="p-3">{q.contactPerson}</td>
                    <td className="p-3">{q.phone}</td>
                    <td className="p-3">{q.vehicleType}</td>
                    <td className="p-3">{q.duration}</td>
                    <td className="p-3 flex gap-3">
                      {/* View Button */}
                      <button
                        onClick={() => {
                          setSelectedQuote(q);
                          setShowPopup(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        👁️ View
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
