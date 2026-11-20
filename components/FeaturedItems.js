
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturedItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu-items?limit=6&featured=true`)
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-red-700">
        Featured Menu Items
      </h2>
      {loading ? (
        <p className="mt-8 text-center text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">No items yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="relative flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              {item.isPremiumVendor && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black shadow">
                  ⭐ Premium
                </span>
              )}
              <img
                src={item.images?.[0]}
                alt={item.itemName}
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm text-gray-500">{item.location}</p>
                <p className="mt-2 font-bold text-red-600">${item.price}</p>
                <Link href={`/menu/${item._id}`} className="mt-auto pt-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}