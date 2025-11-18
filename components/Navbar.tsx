"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // 👤 Simulated user (replace later with real authentication state)
  const user = null;
  // const user = { name: "Mohamad" };

  return (
    <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          ShopEase
        </Link>

        {/* Search (Desktop) */}
        <div className="hidden md:block flex-1 px-8">
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border rounded-lg py-2 pl-10 pr-3"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-500"
              size={18}
            />
          </div>
        </div>

        {/* Desktop Section */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <Link className="hover:text-gray-600 transition" href="/products">
            Products
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart
              size={22}
              className="hover:text-gray-700 transition"
            />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1.5 rounded-full">
              2
            </span>
          </Link>

          {/* Auth / User */}
          {!user ? (
            <>
              <Link href="/auth/login" className="hover:text-gray-600">
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <Image
                  src="/avatar.jpg"
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full cursor-pointer"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border p-3">
                  <Link
                    href="/profile"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    Orders
                  </Link>
                  <button className="block text-left w-full px-2 py-1 hover:bg-gray-100 rounded">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col space-y-4 p-4 text-lg">
            {/* Search */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border rounded-lg py-2 pl-10 pr-3"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-500"
                size={18}
              />
            </div>

            <Link href="/products" onClick={() => setOpen(false)}>
              Products
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative"
              onClick={() => setOpen(false)}
            >
              <ShoppingCart size={22} className="inline-block mr-2" />
              Cart
              <span className="absolute left-16 -top-2 bg-black text-white text-xs px-1.5 rounded-full">
                2
              </span>
            </Link>

            {!user ? (
              <>
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  Login
                </Link>

                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-black text-white rounded-lg text-center"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" onClick={() => setOpen(false)}>
                  Profile
                </Link>
                <Link href="/orders" onClick={() => setOpen(false)}>
                  Orders
                </Link>
                <button onClick={() => setOpen(false)}>Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
