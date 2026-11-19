
"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OrderPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const { data } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data?.token}`,
          },
          body: JSON.stringify({
            itemId: id,
            deliveryDate: f.get("deliveryDate"),
            deliveryAddress: f.get("deliveryAddress"),
            message: f.get("message"),
          }),
        }
      );
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Order failed");
      toast.success("Order placed successfully");
      router.push("/dashboard/customer/orders");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-red-700">Place Your Order</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="deliveryDate">Delivery Date</Label>
          <Input id="deliveryDate" name="deliveryDate" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliveryAddress">Delivery Address</Label>
          <Input id="deliveryAddress" name="deliveryAddress" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Special Instructions</Label>
          <Textarea id="message" name="message" />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700">
          {loading ? "Placing order..." : "Place Order"}
        </Button>
        <Button type="button" variant="outline" className="w-full" onClick={() => toast.info("Payment is not required for pizza orders")}>
          Pay Now
        </Button>
      </form>
    </div>
  );
}