"use client";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({
    id: null,
    name: "",
    text: "",
    image: null as File | null,
  });
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Fetch reviews
  useEffect(() => {
    fetch("https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => {});
  }, []);

  // 🔹 Add / Update review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "review",
      new Blob([JSON.stringify({ name: newReview.name, text: newReview.text })], {
        type: "application/json",
      })
    );
    if (newReview.image) {
      formData.append("image", newReview.image);
    }

    let url = "https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/reviews";
    let method = "POST";

    if (isEditing && newReview.id) {
      url = `https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/reviews/${newReview.id}`;
      method = "PUT";
    }

    const res = await fetch(url, { method, body: formData });
    const data = await res.json();

    if (isEditing) {
      setReviews((prev) => prev.map((r) => (r.id === data.id ? data : r)));
      setIsEditing(false);
    } else {
      setReviews((prev) => [...prev, data]);
    }

    setNewReview({ id: null, name: "", text: "", image: null });
  };

  // 🔹 Delete review
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this review?")) return;

    const res = await fetch(`https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/reviews/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert("Failed to delete");
    }
  };

  // 🔹 Edit review
  const handleEdit = (review: any) => {
    setNewReview({
      id: review.id,
      name: review.name,
      text: review.text,
      image: null,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white">
      {/* ✅ Admin Header */}
      <AdminHeader />

      {/* 🔹 Main Content */}
      <main className="flex-1 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-14">
          <h2 className="text-4xl font-bold text-center mb-4 text-pink-400 tracking-wide">
            ⭐ Happy Riders
          </h2>

          {/* 🔹 Review Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-[#2a1a1a]/80 p-6 rounded-2xl border border-pink-600 shadow-md"
          >
            <h3 className="text-lg font-semibold mb-2 text-pink-400">
              {isEditing ? "Edit Review" : "Add New Review"}
            </h3>
            <input
              type="text"
              placeholder="Your Name"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none"
              required
            />
            <textarea
              placeholder="Your Review"
              value={newReview.text}
              onChange={(e) =>
                setNewReview({ ...newReview, text: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:ring-2 focus:ring-pink-500 outline-none min-h-[100px]"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewReview({
                  ...newReview,
                  image: e.target.files?.[0] || null,
                })
              }
              className="w-full p-2 rounded-lg bg-black border border-gray-700 text-sm"
            />
            <div className="flex gap-4">
              <Button
                type="submit"
                className="mt-2 bg-pink-600 hover:bg-pink-700 text-white"
              >
                {isEditing ? "Update Review" : "Add Review"}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  className="mt-2 bg-gray-600 hover:bg-gray-700 text-white"
                  onClick={() => {
                    setIsEditing(false);
                    setNewReview({ id: null, name: "", text: "", image: null });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>

          {/* 🔹 Reviews List */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <Card
                key={rev.id}
                className="rounded-2xl bg-[#2a1a1a]/90 border border-pink-600 p-6 shadow-md hover:shadow-pink-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center mb-5 gap-4">
                  {rev.image ? (
                    <img
                      src={`https://rajasthanfleet.ap-south-1.elasticbeanstalk.com${rev.image}`}
                      alt={rev.name}
                      className="w-14 h-14 rounded-full object-cover border border-pink-500 shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold shadow-sm">
                      {rev.name ? rev.name.charAt(0) : "?"}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-pink-400 fill-current"
                            />
                          ))}
                        </div>
                        <div className="font-semibold mt-1">{rev.name}</div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(rev)}
                          className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(rev.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 italic leading-relaxed">
                  "{rev.text}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
