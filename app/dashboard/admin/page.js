
"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { api } from "@/lib/api";

export default function AdminOverview() {
  const [s, setS] = useState(null);

  useEffect(() => {
    api("/admin/stats").then(setS).catch(() => setS({}));
  }, []);

  const cards = s
    ? [
        ["Total Users", s.totalUsers],
        ["Vendors", s.totalVendors],
        ["Customers", s.totalCustomers],
        ["Menu Items", s.totalMenuItems],
        ["Pending Items", s.pendingMenuItems],
        ["Transactions", s.totalTransactions],
      ]
    : [];
  const max = Math.max(1, ...cards.map((c) => c[1] || 0));

  return (
    <DashboardShell role="admin">
      <h1 className="text-2xl font-bold text-red-700">Admin Overview</h1>
      {!s ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(([l, v]) => (
              <div key={l} className="rounded-xl border bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">{l}</p>
                <p className="mt-1 text-3xl font-bold text-red-600">{v ?? 0}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-semibold">Platform Summary</h2>
            <div className="space-y-3">
              {cards.map(([l, v]) => (
                <div key={l} className="flex items-center gap-3 text-sm">
                  <span className="w-28">{l}</span>
                  <div className="h-4 flex-1 rounded bg-orange-100">
                    <div className="h-4 rounded bg-red-500" style={{ width: `${((v || 0) / max) * 100}%` }} />
                  </div>
                  <span className="w-8 text-right">{v ?? 0}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  );
}