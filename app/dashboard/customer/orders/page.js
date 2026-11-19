
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import DashboardShell from "@/components/DashboardShell";
import { Button } from "@/components/ui/button";

export default function MyOrders() {
  const [orders, setOrders] = useState(null);

  const load = async () => {
    const { data } = await authClient.token();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/orders`,
      { headers: { Authorization: `Bearer ${data?.token}` } }
    );
    const d = await res.json();
    setOrders(Array.isArray(d) ? d : []);
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    const { data } = await authClient.token();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customer/orders/${id}/cancel`,
      { method: "PATCH", headers: { Authorization: `Bearer ${data?.token}` } }
    );
    const d = await res.json();
    if (!res.ok) return toast.error(d.message || "Failed");
    toast.success("Order cancelled");
    load();
  };

  return (
    <DashboardShell role="customer">
      <h1 className="text-2xl font-bold text-red-700">My Orders</h1>
      {!orders ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="flex gap-4 rounded-xl border bg-white p-4 shadow-sm">
              <img src={o.item?.images?.[0]} alt="" className="h-24 w-24 rounded-md object-cover" />
              <div className="flex-1 text-sm">
                <h3 className="text-lg font-semibold">{o.item?.itemName}</h3>
                <p>Delivery: {o.deliveryDate} · {o.deliveryAddress}</p>
                <p>Requested: {new Date(o.createdAt).toLocaleDateString()}</p>
                <p className="mt-1 font-medium capitalize text-red-600">Status: {o.status}</p>
              </div>
              {o.status === "pending" && (
                <Button variant="outline" onClick={() => cancel(o._id)}>Cancel</Button>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}