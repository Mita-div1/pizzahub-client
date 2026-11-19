
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const links = {
  customer: [
    { href: "/dashboard/customer", label: "Overview" },
    { href: "/dashboard/customer/orders", label: "My Orders" },
    { href: "/dashboard/profile", label: "Profile Settings" },
  ],
  vendor: [
    { href: "/dashboard/vendor", label: "Overview" },
    { href: "/dashboard/vendor/items", label: "My Menu Items" },
    { href: "/dashboard/vendor/add", label: "Add Menu Item" },
    { href: "/dashboard/vendor/orders", label: "Customer Orders" },
    { href: "/dashboard/vendor/subscription", label: "Subscription" },
    { href: "/dashboard/profile", label: "Profile Settings" },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview" },
    { href: "/dashboard/admin/users", label: "Manage Users" },
    { href: "/dashboard/admin/items", label: "Manage Menu Items" },
    { href: "/dashboard/admin/transactions", label: "Transactions" },
  ],
};

export default function DashboardShell({ role, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session || session.user.isBlocked) {
      router.replace("/signin");
    } else if (role && session.user.role !== role) {
      router.replace("/dashboard");
    }
  }, [session, isPending, role, router]);

  if (isPending || !session)
    return <p className="p-10 text-center text-gray-500">Loading...</p>;
  if (role && session.user.role !== role) return null;

  const menu = links[session.user.role] || [];

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row">
      <aside className="md:w-56">
        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {menu.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ${
                pathname === l.href
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}