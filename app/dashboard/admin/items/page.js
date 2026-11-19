
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardShell from "@/components/DashboardShell";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ManageItems() {
  const [items, setItems] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const load = () => {
    const q = new URLSearchParams();
    if (search) q.set("search", search);
    if (status) q.set("status", status);
    api(`/admin/menu-items?${q}`).then(setItems).catch(() => setItems([]));
  };
  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [search, status]);

  const setItemStatus = async (id, s) => {
    try {
      await api(`/admin/menu-items/${id}/status`, { method: "PATCH", body: JSON.stringify({ status: s }) });
      toast.success(`Item ${s}`);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await api(`/admin/menu-items/${id}`, { method: "DELETE" });
      toast.success("Item deleted");
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <DashboardShell role="admin">
      <h1 className="text-2xl font-bold text-red-700">Manage Menu Items</h1>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Input placeholder="Search item" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="h-10 rounded-md border bg-white px-3 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      {!items ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="mt-6 text-gray-500">No items found.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((i) => (
            <div key={i._id} className="flex flex-col gap-3 rounded-xl border bg-white p-4 text-sm shadow-sm sm:flex-row sm:items-center">
              <img src={i.images?.[0]} alt="" className="h-16 w-16 rounded-md object-cover" />
              <div className="flex-1">
                <p className="font-semibold">{i.itemName}</p>
                <p className="text-gray-500">{i.category} · ${i.price} · <span className="capitalize">{i.status}</span></p>
              </div>
              <div className="flex flex-wrap gap-2">
                {i.status !== "approved" && <Button className="bg-green-600 hover:bg-green-700" onClick={() => setItemStatus(i._id, "approved")}>Approve</Button>}
                {i.status !== "rejected" && <Button variant="outline" onClick={() => setItemStatus(i._id, "rejected")}>Reject</Button>}
                {i.status === "approved" && <Button variant="outline" onClick={() => setItemStatus(i._id, "inactive")}>Deactivate</Button>}
                <Button variant="outline" onClick={() => remove(i._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}