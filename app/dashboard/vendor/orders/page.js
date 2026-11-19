
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardShell from "@/components/DashboardShell";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function VendorOrders() {
  const [orders, setOrders] = useState(null);

  const load = () => api("/vendor/orders").then(setOrders).catch(() => setOrders([]));
  useEffect(() => {
    load();
  }, []);

  const act = async (id, action) => {
    try {
      await api(`/vendor/orders/${id}/${action}`, { method: "PATCH" });
      toast.success(`Order ${action}ed`);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <DashboardShell role="vendor">
      <h1 className="text-2xl font-bold text-red-700">Customer Orders</h1>
      {!orders ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-gray-500">No orders yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="rounded-xl border bg-white p-4 text-sm shadow-sm">
              <h3 className="text-lg font-semibold">{o.item?.itemName}</h3>
              <p>Customer: {o.customer?.name} ({o.customer?.email})</p>
              <p>Delivery: {o.deliveryDate} · {o.deliveryAddress}</p>
              {o.message && <p>Message: {o.message}</p>}
              <p className="mt-1 font-medium capitalize text-red-600">Status: {o.status}</p>
              {o.status === "pending" && (
                <div className="mt-3 flex gap-2">
                  <Button className="bg-green-600 hover:bg-green-700" onClick={() => act(o._id, "accept")}>Accept</Button>
                  <Button variant="outline" onClick={() => act(o._id, "reject")}>Reject</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}