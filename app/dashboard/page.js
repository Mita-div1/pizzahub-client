"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardRedirect() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace("/signin");
      return;
    }
    const role = session.user.role;
    if (session.user.isBlocked) {
      router.replace("/signin");
      return;
    }
    router.replace(`/dashboard/${role}`);
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-600">Loading your dashboard...</p>
    </div>
  );
} 