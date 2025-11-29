"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/auth";
import { useEffect } from "react";

export default function CartPage() {
  const {
    items,
    loading,
    error,
    fetchCart,
    addItem,
    removeItem: removeCartItem,
  } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchCart();
  }, [fetchCart, user]);

  const getDisplayProduct = (item: (typeof items)[number]) => {
    const rawProduct =
      item.product && typeof item.product === "object" ? item.product : {};
    const fallbackProduct =
      (item as any)?.productId && typeof (item as any)?.productId === "object"
        ? ((item as any).productId as Record<string, unknown>)
        : {};
    const product = { ...fallbackProduct, ...rawProduct } as Record<
      string,
      unknown
    >;

    const title =
      typeof product.title === "string"
        ? product.title
        : typeof product.name === "string"
          ? product.name
          : typeof product.productName === "string"
            ? product.productName
            : `Item ${item.productId}`;

    const price =
      typeof product.price === "number"
        ? product.price
        : typeof product.price === "string"
          ? Number(product.price)
          : 0;

    const image =
      Array.isArray(product.images) && product.images[0]
        ? String(product.images[0])
        : typeof (product as any).image === "string"
          ? (product as any).image
          : typeof (product as any).thumbnail === "string"
            ? (product as any).thumbnail
            : "/images/hero.jpg";

    return { title, price, image };
  };

  const total = items.reduce((sum, item) => {
    const { price } = getDisplayProduct(item);
    return sum + price * (item.qty || 0);
  }, 0);

  const updateQuantity = async (id: string, qty: number) => {
    try {
      await addItem(id, Math.max(1, qty));
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await removeCartItem(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Container className="py-12">
        <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>
        <p className="mt-2 text-sm text-gray-600">
          Adjust quantities, review totals, and move to checkout when ready.
        </p>

        {error && (
          <Card className="mt-6 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </Card>
        )}

        {!user ? (
          <Card className="mt-8 text-center text-gray-700">
            <div className="space-y-4 py-10">
              <p className="text-lg font-semibold">
                Sign in to view your cart
              </p>
              <p className="text-sm text-gray-500">
                Your saved items will appear once you log in.
              </p>
              <Link href="/login">
                <Button size="lg">Login</Button>
              </Link>
            </div>
          </Card>
        ) : loading ? (
          <Card className="mt-8 text-center text-gray-700">
            <div className="space-y-4 py-10">
              <p className="text-lg font-semibold">Loading your cart…</p>
              <p className="text-sm text-gray-500">
                Fetching the latest items.
              </p>
            </div>
          </Card>
        ) : items.length === 0 ? (
          <Card className="mt-8 text-center text-gray-700">
            <div className="space-y-4 py-10">
              <p className="text-lg font-semibold">Your cart is empty</p>
              <p className="text-sm text-gray-500">
                Add a few favorites and they will show up here.
              </p>
              <Link href="/products">
                <Button size="lg">Shop products</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[2fr,1fr]">
            <Card className="space-y-6">
              {items.map((item) => {
                const display = getDisplayProduct(item);
                return (
                  <div
                    key={item.productId}
                    className="flex flex-col gap-4 border-b border-gray-100 pb-5 last:border-none last:pb-0 sm:flex-row sm:items-center"
                  >
                    <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-gray-50">
                      <Image
                        src={display.image}
                        alt={display.title}
                        fill
                        sizes="150px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            {display.title}
                          </h2>
                          <p className="text-sm text-gray-500">
                            ${display.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-sm font-semibold text-gray-500 underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, (item.qty || 1) - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-lg font-semibold"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-semibold">
                          {item.qty || 1}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, (item.qty || 1) + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Card>

            <Card className="h-fit space-y-4 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Order summary</h2>

              <div className="space-y-2 text-sm text-gray-700">
                <Row label="Subtotal" value={`$${total.toFixed(2)}`} />
                <Row label="Shipping" value="$5.00" />
              </div>

              <div className="border-t border-gray-200 pt-3 text-lg font-semibold text-gray-900">
                <Row label="Total" value={`$${(total + 5).toFixed(2)}`} />
              </div>

              <Button fullWidth size="lg">
                Proceed to checkout
              </Button>
              <p className="text-xs text-gray-500">
                You can review delivery options on the next step.
              </p>
            </Card>
          </div>
        )}
      </Container>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
