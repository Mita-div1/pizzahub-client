
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function ItemDetails({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(0);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace("/signin");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu-items/${id}`)
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.message || "Item not found");
        setItem(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, session, isPending, router]);

  if (isPending || loading)
    return <p className="p-10 text-center text-gray-500">Loading...</p>;
  if (error) return <p className="p-10 text-center text-red-600">{error}</p>;
  if (!item) return null;

  const role = session.user.role;
  const isOwner = item.vendorId === session.user.id;

  const handleOrder = () => {
    if (role === "vendor" && isOwner) {
      toast.error("You cannot order your own item");
      return;
    }
    if (role !== "customer") {
      toast.error("Only customers can place orders");
      return;
    }
    router.push(`/menu/${id}/order`);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
      <div>
        <img
          src={item.images?.[img]}
          alt={item.itemName}
          className="h-96 w-full rounded-xl object-cover"
        />
        {item.images?.length > 1 && (
          <div className="mt-3 flex gap-2">
            {item.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                onClick={() => setImg(i)}
                className="h-20 w-20 cursor-pointer rounded-md object-cover"
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <h1 className="text-3xl font-bold text-red-700">{item.itemName}</h1>
        <p className="mt-1 text-gray-500">{item.category}</p>
        <p className="mt-4 text-gray-700">{item.description}</p>
        <p className="mt-4 text-2xl font-bold text-red-600">${item.price}</p>
        <p className="mt-2 text-sm text-gray-600">Location: {item.location}</p>
        <p className="mt-2 text-sm text-gray-600">
          Sold by: {item.vendor?.businessName || item.vendor?.name || "PizzaHub Vendor"}
        </p>
        <Button
          onClick={handleOrder}
          className="mt-6 bg-red-600 px-8 py-6 hover:bg-red-700"
        >
          Order Now
        </Button>
      </div>
    </div>
  );
}