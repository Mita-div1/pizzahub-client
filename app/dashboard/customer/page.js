
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import DashboardShell from "@/components/DashboardShell";

export default function CustomerOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/orders`,
        { headers: { Authorization: `Bearer ${data?.token}` } }
      );
      const orders = await res.json();
      if (!Array.isArray(orders))
        return setStats({ total: 0, pending: 0, accepted: 0, rejected: 0 });
      setStats({
        total: orders.length,
        pending: orders.filter((o) => o.status === "pending").length,
        accepted: orders.filter((o) => o.status === "accepted").length,
        rejected: orders.filter((o) => o.status === "rejected").length,
      });
    })();
  }, []);

  const cards = stats
    ? [
        ["Total Orders", stats.total],
        ["Pending", stats.pending],
        ["Accepted", stats.accepted],
        ["Rejected", stats.rejected],
      ]
    : [];

  return (
    <DashboardShell role="customer">
      <h1 className="text-2xl font-bold text-red-700">Customer Overview</h1>
      {!stats ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([label, value]) => (
            <div key={label} className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="mt-1 text-3xl font-bold text-red-600">{value}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}