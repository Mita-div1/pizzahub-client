
"use client";

import { useState } from "react";
import { toast } from "sonner";
import DashboardShell from "@/components/DashboardShell";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const user = session?.user;

  const save = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await authClient.updateUser({
      name: f.get("name"),
      image: f.get("image") || undefined,
    });
    setLoading(false);
    if (error) return toast.error(error.message || "Update failed");
    toast.success("Profile updated");
  };

  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold text-red-700">Profile Settings</h1>
      {user && (
        <form onSubmit={save} className="mt-6 max-w-lg space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input name="name" defaultValue={user.name} required />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user.email} disabled readOnly />
          </div>
          <div className="space-y-2">
            <Label>Profile Image URL (optional)</Label>
            <Input name="image" defaultValue={user.image || ""} />
          </div>
          <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      )}
    </DashboardShell>
  );
}