
"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { api } from "@/lib/api";

export default function Transactions() {
  const [list, setList] = useState(null);

  useEffect(() => {
    api("/admin/transactions").then(setList).catch(() => setList([]));
  }, []);

  return (
    <DashboardShell role="admin">
      <h1 className="text-2xl font-bold text-red-700">Transactions</h1>
      {!list ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : list.length === 0 ? (
        <p className="mt-6 text-gray-500">No transactions yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-orange-50">
              <tr>
                <th className="p-3">Vendor</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t._id} className="border-t">
                  <td className="p-3">{t.vendor?.businessName || t.vendor?.name} <span className="text-gray-500">({t.vendor?.email})</span></td>
                  <td className="p-3 capitalize">{t.plan}</td>
                  <td className="p-3">{t.amount} {t.currency?.toUpperCase()}</td>
                  <td className="p-3 capitalize">{t.status}</td>
                  <td className="p-3">{new Date(t.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}