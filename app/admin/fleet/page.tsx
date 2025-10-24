"use client";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer"; // ✅ Optional but consistent with others

export default function FleetAdminPage() {
  const [fleets, setFleets] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    bestFor: "",
    badge: "",
    features: "",
    imageUrl: "",
  });

  // 🔹 Fetch existing fleets
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/fleet`)
      .then((res) => setFleets(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Handle input change
  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🔹 Submit new fleet
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      features: formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0),
    };

    try {
      await axios.post(`${API_BASE_URL}/api/fleet`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Fleet added ✅");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error saving fleet ❌");
    }
  };

  // 🔹 Delete fleet
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this fleet?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/fleet/${id}`);
      setFleets(fleets.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white">
      {/* ✅ Admin Header at top */}
      <AdminHeader />

      {/* 🔹 Main Content */}
      <main className="flex-1 container mx-auto px-4 py-10">
        {/* Add Fleet Form */}
        <Card className="mb-10 shadow-xl rounded-2xl bg-[#2a1a1a] border border-pink-600">
          <CardHeader>
            <CardTitle className="text-pink-400 text-2xl font-bold">
              ➕ Add New Fleet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 md:grid-cols-2 text-black"
            >
              <Input
                name="name"
                placeholder="Car Name"
                onChange={handleChange}
              />
              <Input
                name="capacity"
                placeholder="Capacity (e.g. 7)"
                onChange={handleChange}
              />
              <Input
                name="bestFor"
                placeholder="Best For (e.g. Family, Couples)"
                onChange={handleChange}
              />
              <Input
                name="badge"
                placeholder="Badge (optional, e.g. New)"
                onChange={handleChange}
              />
              <Input
                name="features"
                placeholder="Features (comma separated)"
                onChange={handleChange}
              />
              <Input
                name="imageUrl"
                placeholder="Image Path (e.g. images/fleet/innova.png)"
                onChange={handleChange}
                className="col-span-2"
              />
              <Button
                type="submit"
                className="col-span-2 bg-pink-600 hover:bg-pink-700 text-white"
              >
                Save Fleet
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Fleet List */}
        <Card className="shadow-xl rounded-2xl bg-[#2a1a1a] border border-pink-600">
          <CardHeader>
            <CardTitle className="text-pink-400 text-2xl font-bold">
              🚗 Fleet List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-pink-600 text-white">
                  <th className="p-2">ID</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Capacity</th>
                  <th className="p-2">Best For</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fleets.map((fleet) => (
                  <tr
                    key={fleet.id}
                    className="border-b border-gray-700 hover:bg-[#3a1a1a] transition"
                  >
                    <td className="p-2 text-center">{fleet.id}</td>
                    <td className="p-2 flex justify-center">
                      <img
                        src={`/${fleet.imageUrl}`}
                        alt={fleet.name}
                        className="h-12 w-auto rounded shadow"
                      />
                    </td>
                    <td className="p-2 text-center">{fleet.name}</td>
                    <td className="p-2 text-center">{fleet.capacity}</td>
                    <td className="p-2 text-center">{fleet.bestFor}</td>
                    <td className="p-2 text-center">
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(fleet.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {fleets.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-4 text-gray-400 italic"
                    >
                      No fleets available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
