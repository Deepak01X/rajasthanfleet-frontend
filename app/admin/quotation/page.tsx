"use client";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ✅ Helper to format yyyy-MM-dd or yyyy-MM-ddTHH:mm:ss -> dd-MM-yyyy
function formatDDMMYYYY(dateString: string | null) {
  if (!dateString) return "Date not available";

  // Case 1: plain LocalDate yyyy-MM-dd
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  // Case 2: LocalDateTime yyyy-MM-ddTHH:mm:ss
  const parsed = new Date(dateString);
  if (!isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, "0");
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const year = parsed.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return dateString; // fallback
}

export default function QuotationRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 For modal
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/quotations`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Delete function
  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    fetch(`${API_BASE_URL}/api/quotations/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setRequests((prev) => prev.filter((r) => r.id !== id));
        } else {
          alert("Failed to delete request");
        }
      })
      .catch(() => alert("Server error while deleting"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white">
      {/* ✅ Fixed: Use AdminHeader instead of Header */}
      <AdminHeader />

      {/* 🔹 Main Content */}
      <main className="flex-1 flex justify-center items-start p-20">
        <div className="w-full max-w-5xl space-y-8">
          <h1 className="text-3xl font-bold text-pink-400">
            🧾 Quotation Requests
          </h1>

          {loading ? (
            <p className="text-gray-400">Loading requests...</p>
          ) : requests.length === 0 ? (
            <Card className="bg-[#2a1a1a] border border-gray-700 shadow-md">
              <CardContent className="p-6 text-center text-gray-400">
                No requests found.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {requests.map((req) => (
                <Card
                  key={req.id}
                  className="bg-[#2a1a1a] border border-pink-600 shadow-md hover:shadow-pink-500/40 transition"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-pink-400">
                        {req.name}
                      </h2>
                      <span className="text-sm text-gray-400">
                        {formatDDMMYYYY(req.date)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-300">
                      <strong>Email:</strong> {req.email}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Service:</strong> {req.service}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Pickup:</strong> {req.pickup}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Destination:</strong> {req.destination}
                    </p>

                    <div className="flex gap-3 pt-2">
                      {/* 🔹 View Button opens modal */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRequest(req)}
                        className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white"
                      >
                        View
                      </Button>

                      {/* 🔹 Delete button */}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(req.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ✅ Footer */}
      <Footer />

      {/* 🔹 Modal for Viewing Request */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#2a1a1a] p-6 rounded-lg w-full max-w-lg shadow-lg border border-pink-600">
            <h2 className="text-2xl font-bold mb-4 text-pink-400">
              Request Details
            </h2>

            <p className="mb-2">
              <strong>Name:</strong> {selectedRequest.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selectedRequest.email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {selectedRequest.phone}
            </p>
            <p className="mb-2">
              <strong>Pickup:</strong> {selectedRequest.pickup}
            </p>
            <p className="mb-2">
              <strong>Destination:</strong> {selectedRequest.destination}
            </p>
            <p className="mb-2">
              <strong>Service:</strong> {selectedRequest.service}
            </p>
            <p className="mb-2">
              <strong>Date:</strong>{" "}
              {formatDDMMYYYY(selectedRequest.date)}
            </p>
            <p className="mb-2">
              <strong>Time:</strong> {selectedRequest.time}
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="secondary"
                onClick={() => setSelectedRequest(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
