"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { post } from "@/core/api/client";
import { toast } from "@/lib/toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await post("/auth/otp/request/", {
        identifier: email.trim(),
        purpose: "password_reset",
      });
      setSent(true);
    } catch {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute inset-20 max-w-[500px] left-1/2 -translate-x-1/2 bg-primary rounded-[100%] blur-[70px] -z-1" />
      <main className="relative flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-4 my-20">
          <div className="w-14 aspect-square rounded-lg bg-white flex items-center justify-center">
            <span className="font-bold text-2xl text-primary">S</span>
          </div>
          <h3 className="font-black text-white text-4xl">STLR</h3>
        </div>
        <Card className="min-w-[300px] w-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-sm text-center">
              {sent
                ? "Check your email for a reset link."
                : "Enter your email to receive a password reset link."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {sent ? (
              <>
                <p className="text-sm text-muted-foreground text-center">
                  We&apos;ve sent a reset code to <strong>{email}</strong>. Check
                  your inbox and follow the instructions.
                </p>
                <Link
                  href="/login"
                  className="text-primary font-medium text-sm text-center"
                >
                  Back to login
                </Link>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
                <Link
                  href="/login"
                  className="text-primary font-medium text-sm text-center"
                >
                  Back to login
                </Link>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
