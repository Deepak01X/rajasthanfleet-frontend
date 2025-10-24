"use client";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminHeader"; // ✅ Correct import
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<any | null>(null);

  // 🔹 Fetch messages
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/contact`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Delete function
  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    fetch(`${API_BASE_URL}/api/contact/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setMessages((prev) => prev.filter((m) => m.id !== id));
        } else {
          alert("Failed to delete message");
        }
      })
      .catch(() => alert("Server error while deleting"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white">
      {/* ✅ Fixed: Replaced <Header /> with <AdminHeader /> */}
      <AdminHeader />

      {/* 🔹 Main Content */}
      <main className="flex-1 flex justify-center items-start p-20">
        <div className="w-full max-w-5xl space-y-8">
          <h1 className="text-3xl font-bold text-pink-400">📨 Contact Messages</h1>

          {loading ? (
            <p className="text-gray-400">Loading messages...</p>
          ) : messages.length === 0 ? (
            <Card className="bg-[#2a1a1a] border border-gray-700 shadow-md">
              <CardContent className="p-6 text-center text-gray-400">
                No contact messages found.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {messages.map((msg) => (
                <Card
                  key={msg.id}
                  className="bg-[#2a1a1a] border border-pink-500 shadow-md hover:shadow-pink-600/30 transition"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-pink-400">
                        {msg.name}
                      </h2>
                      <span className="text-sm text-gray-400">{msg.email}</span>
                    </div>

                    <p className="text-sm text-gray-300">
                      <strong>Phone:</strong> {msg.phone || "Not provided"}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Company:</strong> {msg.company || "—"}
                    </p>

                    <p className="text-sm text-gray-300 line-clamp-2">
                      <strong>Message:</strong> {msg.message}
                    </p>

                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMsg(msg)}
                      >
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(msg.id)}
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

      <Footer />

      {/* 🔹 Modal for Viewing Message */}
      {selectedMsg && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#2a1a1a] p-6 rounded-lg w-full max-w-lg shadow-lg border border-pink-500">
            <h2 className="text-2xl font-bold mb-4 text-pink-400">
              Message Details
            </h2>

            <p className="mb-2"><strong>Name:</strong> {selectedMsg.name}</p>
            <p className="mb-2"><strong>Email:</strong> {selectedMsg.email}</p>
            <p className="mb-2">
              <strong>Phone:</strong> {selectedMsg.phone || "Not provided"}
            </p>
            <p className="mb-2">
              <strong>Company:</strong> {selectedMsg.company || "—"}
            </p>
            <p className="mb-2">
              <strong>Message:</strong>
              <br />
              <span className="text-gray-300">{selectedMsg.message}</span>
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="secondary"
                onClick={() => setSelectedMsg(null)}
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
