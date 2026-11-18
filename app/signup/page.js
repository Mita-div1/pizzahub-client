
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("customer");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const image = form.get("image");
    const businessName = form.get("businessName");

    if (!passwordRule.test(password)) {
      toast.error(
        "Password must be at least 6 characters with one uppercase and one lowercase letter"
      );
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || undefined,
      role,
      businessName: role === "vendor" ? businessName : undefined,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Sign up failed");
      return;
    }
    toast.success("Account created successfully");
    router.push("/dashboard");
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">
            Create your PizzaHub account
          </CardTitle>
          <CardDescription>Join as a customer or a restaurant.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Profile Image URL (optional)</Label>
              <Input id="image" name="image" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Account Role</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={role === "customer" ? "default" : "outline"}
                  onClick={() => setRole("customer")}
                  className="flex-1"
                >
                  Customer
                </Button>
                <Button
                  type="button"
                  variant={role === "vendor" ? "default" : "outline"}
                  onClick={() => setRole("vendor")}
                  className="flex-1"
                >
                  Vendor
                </Button>
              </div>
            </div>
            {role === "vendor" && (
              <div className="space-y-2">
                <Label htmlFor="businessName">Restaurant Name</Label>
                <Input id="businessName" name="businessName" required />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          <Button
            type="button"
            variant="outline"
            className="mt-3 w-full"
            onClick={handleGoogle}
          >
            Continue with Google
          </Button>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-red-600 underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}