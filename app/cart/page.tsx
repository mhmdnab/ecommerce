"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  // Mock cart data (later replace with Zustand / DB data)
  const [cart, setCart] = useState([
    {
      id: "1",
      name: "Black T-Shirt",
      price: 25,
      quantity: 1,
      image: "/images/tshirt.jpg",
    },
    {
      id: "2",
      name: "Sneakers",
      price: 70,
      quantity: 2,
      image: "/images/sneakers.jpg",
    },
  ]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-md"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b pb-5"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-500">${item.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 border rounded"
                    >
                      -
                    </button>

                    <span className="px-3">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border rounded-xl p-6 h-fit bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>$5.00</span>
            </div>

            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total:</span>
              <span>${(total + 5).toFixed(2)}</span>
            </div>

            <button className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
