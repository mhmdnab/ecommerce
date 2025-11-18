"use client";

import { useState } from "react";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isLogin = type === "login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FORM SUBMITTED →", form);
    // later: call your backend API here
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md p-8 rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-6">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg text-lg hover:bg-gray-800 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="text-center mt-5 text-gray-600 text-sm">
        {isLogin ? (
          <>
            Don’t have an account?{" "}
            <Link href="/auth/register" className="text-black font-semibold">
              Register
            </Link>
          </>
        ) : (
          <>
            Already registered?{" "}
            <Link href="/auth/login" className="text-black font-semibold">
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
