
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardShell from "@/components/DashboardShell";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ManageUsers() {
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const load = () => {
    const q = new URLSearchParams();
    if (search) q.set("search", search);
    if (role) q.set("role", role);
    api(`/admin/users?${q}`).then(setUsers).catch(() => setUsers([]));
  };
  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [search, role]);

  const toggle = async (u) => {
    try {
      await api(`/admin/users/${u._id}/${u.isBlocked ? "unblock" : "block"}`, { method: "PATCH" });
      toast.success(u.isBlocked ? "User unblocked" : "User blocked");
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <DashboardShell role="admin">
      <h1 className="text-2xl font-bold text-red-700">Manage Users</h1>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Input placeholder="Search name or email" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="h-10 rounded-md border bg-white px-3 text-sm" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All roles</option>
          <option value="vendor">Vendor</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {!users ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : users.length === 0 ? (
        <p className="mt-6 text-gray-500">No users found.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {users.map((u) => (
            <div key={u._id} className="flex items-center justify-between rounded-xl border bg-white p-4 text-sm shadow-sm">
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-gray-500">{u.email} · {u.role} · {u.isBlocked ? "Blocked" : "Active"}</p>
              </div>
              {u.role !== "admin" && (
                <Button variant="outline" onClick={() => toggle(u)}>
                  {u.isBlocked ? "Unblock" : "Block"}
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}