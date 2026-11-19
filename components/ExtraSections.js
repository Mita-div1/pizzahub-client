
"use client";

import { motion } from "framer-motion";

const benefits = [
  { icon: "🚚", title: "Fast Delivery", text: "Hot pizza at your door on the date you choose." },
  { icon: "🏪", title: "Local Shops", text: "Order from trusted pizza shops near you." },
  { icon: "✅", title: "Verified Menus", text: "Every item is reviewed and approved by our admins." },
  { icon: "💳", title: "Easy Ordering", text: "Pick, order and track your pizza in a few clicks." },
];

const steps = [
  { no: "1", title: "Browse", text: "Explore menus from local pizza shops." },
  { no: "2", title: "Order", text: "Choose your pizza, date and delivery address." },
  { no: "3", title: "Enjoy", text: "The shop accepts your order and delivers it." },
];

export default function ExtraSections() {
  return (
    <>
      <section className="bg-orange-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold text-red-700">
            Why Choose PizzaHub?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="h-full rounded-xl border bg-white p-6 text-center shadow-sm"
              >
                <div className="text-4xl">{b.icon}</div>
                <h3 className="mt-3 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-red-700">
          How PizzaHub Works
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="h-full rounded-xl border bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
                {s.no}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}