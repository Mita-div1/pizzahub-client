
"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";

export default function VendorOverview() {
  const { data: session } = authClient.useSession();
  const [s, setS] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const items = await api("/vendor/menu-items");
        const orders = await api("/vendor/orders");
        setS({
          total: items.length,
          active: items.filter((i) => i.status === "approved").length,
          pending: orders.filter((o) => o.status === "pending").length,
          accepted: orders.filter((o) => o.status === "accepted").length,
        });
      } catch {
        setS({ total: 0, active: 0, pending: 0, accepted: 0 });
      }
    })();
  }, []);

  const plan = session?.user?.subscriptionPlan || "free";
  const cards = s
    ? [
        ["Total Menu Items", s.total],
        ["Active Menu Items", s.active],
        ["Pending Orders", s.pending],
        ["Accepted Orders", s.accepted],
        ["Current Plan", plan.toUpperCase()],
      ]
    : [];

  return (
    <DashboardShell role="vendor">
      <h1 className="text-2xl font-bold text-red-700">Vendor Overview</h1>
      {!s ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(([l, v]) => (
            <div key={l} className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">{l}</p>
              <p className="mt-1 text-3xl font-bold text-red-600">{v}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}