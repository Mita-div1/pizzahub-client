
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DashboardShell from "@/components/DashboardShell";
import { api, uploadImage } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
  "Sides & Appetizers",
  "Beverages & Desserts",
];

export default function AddItem() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const file = f.get("image");
    if (!file || !file.size) return toast.error("Item image is required");
    setLoading(true);
    try {
      const url = await uploadImage(file);
      await api("/vendor/menu-items", {
        method: "POST",
        body: JSON.stringify({
          itemName: f.get("itemName"),
          category: f.get("category"),
          description: f.get("description"),
          price: f.get("price"),
          location: f.get("location"),
          images: [url],
        }),
      });
      toast.success("Item submitted for approval");
      router.push("/dashboard/vendor/items");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell role="vendor">
      <h1 className="text-2xl font-bold text-red-700">Add Menu Item</h1>
      <form onSubmit={submit} className="mt-6 max-w-lg space-y-4">
        <div className="space-y-2">
          <Label>Item Name</Label>
          <Input name="itemName" required />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <select name="category" required className="h-10 w-full rounded-md border bg-white px-3 text-sm">
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea name="description" required />
        </div>
        <div className="space-y-2">
          <Label>Price ($)</Label>
          <Input name="price" type="number" step="0.01" min="0" required />
        </div>
        <div className="space-y-2">
          <Label>Location (area / city)</Label>
          <Input name="location" required />
        </div>
        <div className="space-y-2">
          <Label>Item Image</Label>
          <Input name="image" type="file" accept="image/*" required />
        </div>
        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
          {loading ? "Uploading..." : "Add Item"}
        </Button>
      </form>
    </DashboardShell>
  );
}