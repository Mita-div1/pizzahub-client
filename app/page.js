
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Classic Pizzas", emoji: "🍕" },
  { name: "Vegetarian Pizzas", emoji: "🥬" },
  { name: "Meat Lovers", emoji: "🥓" },
  { name: "Specialty / Gourmet Pizzas", emoji: "👨‍🍳" },
  { name: "Sides & Appetizers", emoji: "🍟" },
  { name: "Beverages & Desserts", emoji: "🥤" },
];

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-orange-100 via-red-50 to-amber-50">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold leading-tight text-red-700 md:text-5xl">
              Hot &amp; Fresh Pizza Delivered to Your Door
            </h1>
            <p className="mt-4 max-w-lg text-lg text-gray-700">
              Discover local pizza shops, browse their menus and order your
              favorite pizza in just a few clicks.
            </p>
            <Link href="/menu">
              <Button className="mt-6 bg-red-600 px-6 py-6 text-base hover:bg-red-700">
                Explore Pizza Menu
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
              alt="Fresh pizza"
              className="h-80 w-80 rounded-full object-cover shadow-2xl md:h-96 md:w-96"
            />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-red-700">
          Explore by Category
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
          Find exactly what you are craving.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/menu?category=${encodeURIComponent(c.name)}`}
                className="flex h-36 flex-col items-center justify-center rounded-xl border bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-red-400 hover:shadow-md"
              >
                <span className="text-4xl">{c.emoji}</span>
                <span className="mt-2 text-sm font-semibold">{c.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}