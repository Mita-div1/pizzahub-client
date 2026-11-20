
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import DashboardShell from "@/components/DashboardShell";
import { Button } from "@/components/ui/button";

function getSteps(status) {
  if (status === "rejected") return { labels: ["Placed", "Rejected"], current: 1, bad: true };
  if (status === "cancelled") return { labels: ["Placed", "Cancelled"], current: 1, bad: true };
  if (status === "accepted") return { labels: ["Placed", "Pending", "Accepted"], current: 2, bad: false };
  return { labels: ["Placed", "Pending", "Accepted"], current: 1, bad: false };
}

function Timeline({ status }) {
  const { labels, current, bad } = getSteps(status);
  return (
    <div className="mt-3 flex items-center">
      {labels.map((label, i) => {
        const done = i <= current;
        const isBadStep = bad && i === current;
        const color = isBadStep
          ? "bg-red-600 text-white"
          : done
          ? "bg-green-600 text-white"
          : "bg-gray-200 text-gray-500";
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${color}`}>
                {isBadStep ? "✕" : done ? "✓" : i + 1}
              </div>
              <span className="mt-1 text-xs">{label}</span>
            </div>
            {i < labels.length - 1 && (
              <div className={`mx-2 mb-4 h-0.5 w-10 sm:w-16 ${i < current ? "bg-green-600" : "bg-gray-300"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

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
                <Timeline status={o.status} />
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