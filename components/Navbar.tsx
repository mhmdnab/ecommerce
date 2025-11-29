"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";
import Container from "./Container";
import { Button } from "./ui/Button";
import { useAuth } from "@/store/auth";
import { useCart } from "@/store/cart";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, logout, hydrate } = useAuth();
  const { items: cartItems, fetchCart, reset: resetCart } = useCart();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      resetCart();
    }
  }, [user, fetchCart, resetCart]);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.qty || 0),
    0
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-900 via-gray-800 to-black px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
        <Container className="flex items-center justify-between gap-4">
          <span>End of season sale · New arrivals drop weekly</span>
          <Link href="/products" className="underline underline-offset-4">
            Shop new-in
          </Link>
        </Container>
      </div>

      <Container className="h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-gray-900"
        >
          ShopEase
        </Link>

        <div className="hidden md:flex flex-1 items-center gap-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for sneakers, tees, tech..."
              className="w-full rounded-2xl border border-gray-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm shadow-[0_10px_35px_rgba(15,23,42,0.08)] focus:border-black focus:outline-none"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <Link className="hover:text-black transition" href="/products">
              Products
            </Link>
            <Link className="hover:text-black transition" href="/category">
              Categories
            </Link>
            <Link className="hover:text-black transition" href="/cart">
              Cart
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart
              size={22}
              className="text-gray-800 hover:text-black transition"
            />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          </Link>

          {!user ? (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-700 hover:text-black"
              >
                Login
              </Link>
              <Link href="/register">
                <Button size="md">Join free</Button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <User size={18} />
                {user?.email ?? "Account"}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-44 rounded-xl border border-gray-100 bg-white shadow-xl">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Orders
                  </Link>
                  <button
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="md:hidden rounded-full border border-gray-200 p-2 shadow-sm"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <Container className="flex flex-col gap-4 py-5">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:border-black focus:outline-none"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-500"
                size={18}
              />
            </div>

            <Link
              href="/products"
              className="text-base font-semibold text-gray-800"
              onClick={() => setOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/category"
              className="text-base font-semibold text-gray-800"
              onClick={() => setOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-base font-semibold text-gray-800"
              onClick={() => setOpen(false)}
            >
              <ShoppingCart size={18} />
              Cart
              <span className="ml-auto rounded-full bg-black px-2 py-0.5 text-xs text-white">
                {cartCount}
              </span>
            </Link>

            {!user ? (
              <>
                <Link
              href="/login"
              className="text-base font-semibold text-gray-800"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              <Button fullWidth size="md">
                Join free
              </Button>
            </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="text-base font-semibold text-gray-800"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="text-base font-semibold text-gray-800"
                  onClick={() => setOpen(false)}
                >
                  Orders
                </Link>
                <button
                  className="text-left text-base font-semibold text-gray-800"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </Container>
        </div>
      )}
    </nav>
  );
}
