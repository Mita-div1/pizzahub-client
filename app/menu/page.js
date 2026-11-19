
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
  "Sides & Appetizers",
  "Beverages & Desserts",
];

function MenuContent() {
  const params = useSearchParams();
  const { data: session } = authClient.useSession();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      const q = new URLSearchParams();
      if (search) q.set("search", search);
      if (category) q.set("category", category);
      if (location) q.set("location", location);
      if (sort) q.set("sort", sort);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu-items?${q.toString()}`)
        .then((r) => r.json())
        .then((d) => setItems(Array.isArray(d) ? d : []))
        .catch(() => setItems([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [search, category, location, sort]);

  const selectClass = "h-10 rounded-md border bg-white px-3 text-sm";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-red-700">Browse Menu</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
        <Input placeholder="Filter by location..." value={location} onChange={(e) => setLocation(e.target.value)} />
        <select className={selectClass} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading menu...</p>
      ) : items.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No items found.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className="flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
              <img src={item.images?.[0]} alt={item.itemName} className="h-48 w-full object-cover" />
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm text-gray-500">{item.location}</p>
                <p className="mt-2 font-bold text-red-600">${item.price}</p>
                <Link href={session ? `/menu/${item._id}` : "/signin"} className="mt-auto pt-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700">View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<p className="p-10 text-center">Loading...</p>}>
      <MenuContent />
    </Suspense>
  );
}