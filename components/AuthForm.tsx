"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, Sparkles, User } from "lucide-react";
import { Card } from "./ui/Card";
import { InputField } from "./ui/InputField";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { useAuth } from "@/store/auth";

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isLogin = type === "login";
  const { login, register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (isLogin) {
        await login(form.email, form.password);
        setSuccessMsg("Logged in successfully!");
      } else {
        await register(form.email, form.password, form.username);
        setSuccessMsg("Account created successfully!");
      }
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
      else setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="absolute -left-20 -top-10 h-44 w-44 rounded-full bg-black/10 blur-3xl" />
      <div className="absolute -right-16 top-12 h-48 w-48 rounded-full bg-gray-200 blur-3xl" />

      <div className="relative grid gap-8 rounded-3xl bg-white/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur md:grid-cols-2 md:p-10">
        <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 text-white">
          <div className="space-y-4">
            <Badge tone="neutral">ShopEase</Badge>
            <h2 className="text-3xl font-bold">
              {isLogin ? "Welcome back." : "Create your ShopEase ID."}
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              Secure sign-in with instant checkout, saved addresses, and order
              updates that actually arrive on time.
            </p>
          </div>

          <div className="mt-10 space-y-3 text-sm text-gray-200">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
              <ShieldCheck className="h-5 w-5" />
              <div>
                <p className="font-semibold text-white">Protected sessions</p>
                <p className="text-xs text-gray-300">
                  We monitor unusual sign-ins and notify you instantly.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
              <Sparkles className="h-5 w-5" />
              <div>
                <p className="font-semibold text-white">
                  One account, everywhere
                </p>
                <p className="text-xs text-gray-300">
                  Sync your cart across devices and resume right where you left.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-white">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMsg}
              </div>
            )}

            {!isLogin && (
              <InputField
                type="text"
                name="username"
                label="Username"
                placeholder="alex_summers"
                onChange={handleChange}
                icon={<User className="h-4 w-4" />}
                required
              />
            )}

            <InputField
              type="email"
              name="email"
              label="Email address"
              placeholder="you@example.com"
              onChange={handleChange}
              icon={<Mail className="h-4 w-4" />}
              required
            />

            <InputField
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              onChange={handleChange}
              icon={<Lock className="h-4 w-4" />}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              fullWidth
              size="lg"
              className="mt-2"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login and continue"
                : "Create account"}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
            <span>
              {isLogin ? "New to ShopEase?" : "Already have an account?"}
            </span>
            {isLogin ? (
              <Link
                href="/register"
                className="font-semibold text-black underline underline-offset-4"
              >
                Create one
              </Link>
            ) : (
              <Link
                href="/login"
                className="font-semibold text-black underline underline-offset-4"
              >
                Login
              </Link>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
