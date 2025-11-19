"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Card from "../../components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true);
    // post info to the database
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/");
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 px-4">
      <Card>
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

          {error && <div className="text-sm text-red-600">{error}</div>}

          <Button type="submit" className="w-full">{loading ? "Signing in..." : "Sign in"}</Button>
        </form>

        <p className="mt-4 text-sm muted">
          Don't have an account? <Link href="/signup" className="text-indigo-600">Sign up</Link>
        </p>
      </Card>
    </div>
  );
}
