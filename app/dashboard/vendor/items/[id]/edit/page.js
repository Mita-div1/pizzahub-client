
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import DashboardShell from "@/components/DashboardShell";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function EditItem() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api("/vendor/menu-items")
      .then((list) => {
        const item = list.find((x) => x._id === id);
        if (!item) {
          toast.error("Item not found");
          router.push("/dashboard/vendor/items");
          return;
        }
        setForm({
          itemName: item.itemName || "",
          category: item.category || "",
          price: item.price || "",
          location: item.location || "",
          description: item.description || "",
        });
      })
      .catch((e) => toast.error(e.message));
  }, [id, router]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api(`/vendor/menu-items/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      toast.success("Item updated");
      router.push("/dashboard/vendor/items");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const field = "w-full rounded-md border px-3 py-2 text-sm";

  return (
    <DashboardShell role="vendor">
      <h1 className="text-2xl font-bold text-red-700">Edit Menu Item</h1>
      {!form ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : (
        <form onSubmit={submit} className="mt-6 max-w-lg space-y-4">
          <input name="itemName" value={form.itemName} onChange={change} placeholder="Item name" className={field} required />
          <input name="category" value={form.category} onChange={change} placeholder="Category" className={field} required />
          <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={change} placeholder="Price" className={field} required />
          <input name="location" value={form.location} onChange={change} placeholder="Location" className={field} required />
          <textarea name="description" value={form.description} onChange={change} placeholder="Description" rows={4} className={field} />
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      )}
    </DashboardShell>
  );
}