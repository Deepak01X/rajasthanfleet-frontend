"use client";
import { API_BASE_URL } from "@/lib/apiConfig";
import AdminHeader from "@/components/AdminHeader";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function AdminServicesPage() {
  const [category, setCategory] = useState("");
  const [carName, setCarName] = useState("");
  const [image, setImage] = useState("");
  const [services, setServices] = useState([{ type: "", price: "" }]);
  const [saving, setSaving] = useState(false);
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // ✅ Fetch all services from DB
  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/services`);
      const data = await res.json();
      setServiceList(data);
    } catch (err) {
      console.error("❌ Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ➕ Add new service row
  const addService = () => setServices([...services, { type: "", price: "" }]);

  // ❌ Remove service row
  const removeService = (index: number) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  // ✏️ Update input fields
  const handleServiceChange = (index: number, field: string, value: string) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  // 💾 Submit new car & multiple services
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!category || !carName || !image) {
      alert("Please fill category, car name and image before saving");
      return;
    }

    try {
      setSaving(true);

      for (const s of services) {
        if (!s.type || !s.price) continue;

        const payload = {
          category,
          carName,
          image,
          serviceType: s.type,
          price: s.price,
        };

        if (editingId) {
          // ✅ PUT request with path variable
          await fetch(`${API_BASE_URL}/api/services/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          // ✅ POST request for new service
          await fetch(`${API_BASE_URL}/api/services`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
      }

      alert(editingId ? "✅ Updated successfully!" : "✅ Saved successfully!");
      setCategory("");
      setCarName("");
      setImage("");
      setServices([{ type: "", price: "" }]);
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error("❌ Error saving:", err);
    } finally {
      setSaving(false);
    }
  };

  // 🗑️ Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/services/${id}`, { method: "DELETE" });
      fetchServices();
      alert("🗑️ Deleted successfully!");
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // ✏️ Edit (prefill data)
  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setCategory(item.category);
    setCarName(item.carName);
    setImage(item.image);
    setServices([{ type: item.serviceType, price: item.price }]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white">
      <AdminHeader />

      <main className="flex-1 flex flex-col items-center py-24 px-6">
        <Card className="bg-[#2a1a1a] border border-pink-600 w-full max-w-3xl shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-center text-pink-400 text-2xl font-bold">
              {editingId ? "✏️ Edit Service" : "➕ Add Car & Multiple Services"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Category (e.g. Sedan, SUV)"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-black"
                />
                <Input
                  placeholder="Car Name (e.g. Swift Dzire)"
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  className="text-black"
                />
                <Input
                  placeholder="Image Path (e.g. /swift.png)"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="text-black md:col-span-2"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-pink-400">Services</h3>
                {services.map((s, i) => (
                  <div
                    key={i}
                    className="bg-gray-800 p-3 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                  >
                    <Input
                      placeholder="Service Type (e.g. ✈️ Airport Transfer)"
                      value={s.type}
                      onChange={(e) => handleServiceChange(i, "type", e.target.value)}
                      className="text-black flex-1"
                    />
                    <Input
                      placeholder="Price (e.g. ₹1200 or ₹14/km)"
                      value={s.price}
                      onChange={(e) => handleServiceChange(i, "price", e.target.value)}
                      className="text-black flex-1"
                    />
                    {services.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeService(i)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addService}
                  className="bg-pink-600 hover:bg-pink-700 w-full"
                >
                  + Add Another Service
                </Button>
              </div>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-lg"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Service"
                    : "Save All"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-[#2a1a1a] border border-pink-600 w-full max-w-5xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-pink-400 text-2xl font-bold">
              📋 Existing Services
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-pink-600 text-white">
                  <th className="p-2">ID</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Car</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {serviceList.length > 0 ? (
                  serviceList.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-700 hover:bg-[#3a1a1a] transition"
                    >
                      <td className="p-2 text-center">{item.id}</td>
                      <td className="p-2 text-center">{item.category}</td>
                      <td className="p-2 text-center">{item.carName}</td>
                      <td className="p-2 text-center">
                        <img
                          src={item.image}
                          alt={item.carName}
                          className="h-12 w-auto rounded-lg mx-auto"
                        />
                      </td>
                      <td className="p-2 text-center">{item.serviceType}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center space-x-2">
                        <Button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-gray-400 italic"
                    >
                      No services available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
