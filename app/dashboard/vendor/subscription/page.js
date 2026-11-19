
"use client";

import { useState } from "react";
import { toast } from "sonner";
import DashboardShell from "@/components/DashboardShell";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function Subscription() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const user = session?.user;
  const premium =
    user?.subscriptionPlan === "premium" &&
    user?.subscriptionExpiresAt &&
    new Date(user.subscriptionExpiresAt) > new Date();

  const upgrade = async () => {
    setLoading(true);
    try {
      const { url } = await api("/payments/create-checkout-session", { method: "POST" });
      window.location.href = url;
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  const plans = [
    { name: "Free", items: ["Max 3 active menu items", "Basic vendor dashboard", "Order management"] },
    { name: "Premium", items: ["Unlimited active items", "Premium vendor badge", "Featured menu placement", "All Free features"] },
  ];

  return (
    <DashboardShell role="vendor">
      <h1 className="text-2xl font-bold text-red-700">Subscription</h1>
      <p className="mt-2 text-gray-600">
        Current plan: <b>{premium ? "Premium" : "Free"}</b>
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {plans.map((p) => (
          <div key={p.name} className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {p.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      {!premium && (
        <Button onClick={upgrade} disabled={loading} className="mt-6 bg-red-600 hover:bg-red-700">
          {loading ? "Redirecting..." : "Upgrade to Premium"}
        </Button>
      )}
    </DashboardShell>
  );
}