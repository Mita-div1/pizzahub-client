"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import DashboardShell from "@/components/DashboardShell";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function MyItems() {
  const [items, setItems] = useState(null);

  const load = () => api("/vendor/menu-items").then(setItems).catch(() => setItems([]));
  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await api(`/vendor/menu-items/${id}`, { method: "DELETE" });
      toast.success("Item deleted");
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const toggle = async (item) => {
    try {
      await api(`/vendor/menu-items/${item._id}`, {
        method: "PATCH",
        body: JSON.stringify({ available: item.available === false }),
      });
      toast.success(item.available === false ? "Marked as available" : "Marked as unavailable");
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <DashboardShell role="vendor">
      <h1 className="text-2xl font-bold text-red-700">My Menu Items</h1>
      {!items ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="mt-6 text-gray-500">No items yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((i) => (
            <div key={i._id} className="flex gap-4 rounded-xl border bg-white p-4 shadow-sm">
              <img src={i.images?.[0]} alt="" className="h-24 w-24 rounded-md object-cover" />
              <div className="flex-1 text-sm">
                <h3 className="text-lg font-semibold">{i.itemName}</h3>
                <p>{i.category} · ${i.price} · {i.location}</p>
                <p className="mt-1 font-medium capitalize text-red-600">Status: {i.status}</p>
                <p className="text-xs text-gray-500">
                  {i.available === false ? "Currently unavailable" : "Available"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/dashboard/vendor/items/${i._id}/edit`}
                  className="rounded-md border px-3 py-1.5 text-center text-sm hover:bg-gray-50"
                >
                  Edit
                </Link>
                <Button variant="outline" onClick={() => toggle(i)}>
                  {i.available === false ? "Set Available" : "Set Unavailable"}
                </Button>
                <Button variant="outline" onClick={() => remove(i._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}