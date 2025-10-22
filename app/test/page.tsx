"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminTravelTips() {
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<any>({
    id: null,
    title: "",
    description: "",
    previewText: "",
    icon: "Compass",
    category: "magic",
    file: null, // File object when user selects new file
    filePreview: null, // URL or existing imageUrl string
  });

  useEffect(() => {
    fetch("https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/tips")
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tips:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  // file change handler (use functional setState so no stale)
  const handleFileChange = (file: File | null) => {
    setFormData((prev: any) => {
      // cleanup old preview URL if it was object URL
      if (prev._objectUrl) {
        try { URL.revokeObjectURL(prev._objectUrl); } catch (_) {}
      }
      if (!file) {
        return { ...prev, file: null, filePreview: null, _objectUrl: null };
      }
      const objectUrl = URL.createObjectURL(file);
      return {
        ...prev,
        file,
        filePreview: objectUrl,
        _objectUrl: objectUrl, // keep for cleanup
      };
    });
  };

  // Save (Add / Update)
  const handleSave = async () => {
    // Prevent double submit
    if (saving) return;
    // Validate required fields
    if (!formData.title?.trim()) { alert("Please enter title"); return; }
    if (!formData.description?.trim()) { alert("Please enter description"); return; }

    // For category=card: Add (no id) requires an image.
    if (formData.category === "card") {
      const hasNewFile = !!formData.file;
      const hasPreview = !!formData.filePreview;
      // if adding (no id) require either new file or preview (preview shouldn't exist on add)
      if (!formData.id && !hasNewFile) {
        alert("Please select an image for Card tips (required when adding).");
        return;
      }
      // If editing (has id): allow if either new file or existing preview
      if (formData.id && !hasNewFile && !hasPreview) {
        alert("Card tips must have an image — please select one.");
        return;
      }
    }

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/tips/${formData.id}`
      : "https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/tips";

    const fd = new FormData();
    const tipObject = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      previewText: formData.category === "card" ? formData.previewText : null,
      icon: formData.icon,
      category: formData.category,
      // do not include file info here — backend uses imagefile part
    };

    fd.append(
      "travelTips",
      new Blob([JSON.stringify(tipObject)], { type: "application/json" }),
      "travelTips.json"
    );

    if (formData.file) {
      // append with filename to avoid Spring parsing issues
      fd.append("imagefile", formData.file, formData.file.name);
    }

    // Debug: log entries (useful in console)
    console.log("Submitting tipObject:", tipObject);
    for (const pair of Array.from(fd.entries())) {
      console.log("FormData entry:", pair[0], pair[1]);
    }

    try {
      setSaving(true);
      const res = await fetch(url, { method, body: fd });
      // if backend returns non-json error, handle gracefully
      if (!res.ok) {
        let errObj: any = { error: "Unknown error" };
        try { errObj = await res.json(); } catch { errObj = { error: await res.text() } }
        throw new Error(errObj.error || JSON.stringify(errObj));
      }
      const saved = await res.json();

      if (formData.id) {
        setTips((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
      } else {
        setTips((prev) => [...prev, saved]);
      }

      // reset only after success
      setFormData({
        id: null,
        title: "",
        description: "",
        previewText: "",
        icon: "Compass",
        category: "magic",
        file: null,
        filePreview: null,
      });
      alert("Saved successfully");
    } catch (err: any) {
      console.error("Save error:", err);
      alert("Error saving tip: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (tip: any) => {
    setFormData({
      id: tip.id,
      title: tip.title,
      description: tip.description,
      previewText: tip.previewText || "",
      icon: tip.icon,
      category: tip.category,
      file: null, // no new file selected yet
      filePreview: tip.imageUrl || null, // existing image
      _objectUrl: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this tip?")) return;
    fetch(`https://rajasthanfleet.ap-south-1.elasticbeanstalk.com/api/tips/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) setTips((prev) => prev.filter((t) => t.id !== id));
      })
      .catch(() => alert("Error deleting tip"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1313] text-white">
      <Header />
      <main className="flex-1 pt-28 px-6 lg:px-20 space-y-10 container mx-auto">
        <h1 className="text-3xl font-bold text-primary">Manage Travel Tips</h1>

        {/* Form */}
        <Card className="bg-[#2a1a1a] border border-gray-700">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              {formData.id ? "Edit Tip" : "Add New Tip"}
            </h2>

            <Input placeholder="Title" value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)} />

            <Textarea placeholder="Description" value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)} />

            <div>
              <label className="text-sm text-gray-400">Icon</label>
              <Select value={formData.icon} onValueChange={(val) => handleChange("icon", val)}>
                <SelectTrigger><SelectValue placeholder="Select Icon" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Compass">Compass</SelectItem>
                  <SelectItem value="BookOpen">BookOpen</SelectItem>
                  <SelectItem value="Utensils">Utensils</SelectItem>
                  <SelectItem value="CloudRain">CloudRain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-400">Category</label>
              <Select value={formData.category} onValueChange={(val) => handleChange("category", val)}>
                <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="magic">Magic (Hidden Tips)</SelectItem>
                  <SelectItem value="card">Card (Travel Cards)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.category === "card" && (
              <>
                <Input placeholder="Preview Text (shown under image)" value={formData.previewText}
                  onChange={(e) => handleChange("previewText", e.target.value)} />

                <div>
                  <label className="text-sm text-gray-400">Upload Image</label>
                  <div className="flex items-center gap-3">
                    <label htmlFor="fileUpload"
                      className="cursor-pointer bg-primary/20 hover:bg-primary/40 text-sm px-4 py-2 rounded-lg transition">
                      {formData.file ? formData.file.name : (formData.filePreview ? "Using existing image (change?)" : "Choose Image File")}
                    </label>

                    <input id="fileUpload" type="file" accept="image/*" className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        console.log("Selected file:", f);
                        handleFileChange(f);
                      }} />
                  </div>

                  {formData.filePreview && (
                    <img src={formData.filePreview} alt="Preview" className="mt-3 w-40 h-28 object-cover rounded-md border border-gray-600" />
                  )}
                </div>
              </>
            )}

            <Button className="mt-4" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : (formData.id ? "Update Tip" : "Add Tip")}
            </Button>
          </CardContent>
        </Card>

        {/* List */}
        {loading ? <p className="text-gray-400">Loading tips...</p> : (
          <div className="grid gap-6">
            {tips.map((tip) => (
              <Card key={tip.id} className="bg-[#2a1a1a] border border-gray-700 shadow-md hover:shadow-lg transition">
                <CardContent className="p-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{tip.title}</h2>
                    <span className="text-sm text-gray-400">{tip.category} / {tip.icon}</span>
                  </div>
                  <p className="text-sm text-gray-300">{tip.description}</p>
                  {tip.imageUrl && <img src={tip.imageUrl} alt={tip.title} className="w-full h-32 object-cover rounded-md" />}
                  {tip.previewText && <p className="text-xs text-gray-400 mt-1 text-center">{tip.previewText}</p>}
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(tip)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(tip.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
