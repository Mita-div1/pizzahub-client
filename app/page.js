 
 "use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    </div>
  );
}