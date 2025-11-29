"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Product, getProductById } from "@/lib/api";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ProductDetails() {
  const params = useParams<{ id: string }>();
  const productId = useMemo(
    () =>
      typeof params?.id === "string"
        ? params.id
        : Array.isArray(params?.id)
          ? params?.id[0]
          : "",
    [params?.id]
  );

  const [product, setProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState<{ average: number; count: number }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const { addItem, loading: cartLoading, error: cartError } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(productId);
        setProduct(data.product);
        if (data.rating) setRating(data.rating);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to load product.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!productId) return;
    setFeedback(null);
    try {
      await addItem(productId, 1);
      setFeedback("Added to your cart.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not update cart.";
      setFeedback(message);
    }
  };

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-14">
        <Card className="p-8 text-center text-gray-600">
          <p className="text-lg font-semibold">Loading product…</p>
        </Card>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-14">
        <Card className="p-8 text-center text-gray-600">
          <p className="text-lg font-semibold">
            {error || "Product not found"}
          </p>
        </Card>
      </main>
    );
  }

  const price = product.price ?? 0;

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl bg-gray-50 p-8">
          <div className="relative h-[420px] w-full max-w-lg overflow-hidden rounded-2xl">
            <Image
              src={product.images?.[0] || "/images/hero.jpg"}
              alt={product.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            {rating && (
              <span className="rounded-full bg-gray-900 px-3 py-1 text-sm font-semibold text-white">
                {rating.average?.toFixed(1) ?? "—"} ★ ({rating.count})
              </span>
            )}
          </div>

          <p className="mt-4 text-2xl font-semibold text-gray-800">
            ${price.toFixed(2)}
          </p>

          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            {product.description || "No description provided."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={handleAddToCart} disabled={cartLoading}>
              {cartLoading ? "Adding…" : "Add to cart"}
            </Button>
            {product.stock !== undefined && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            )}
          </div>

          {(feedback || cartError) && (
            <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700">
              {feedback || cartError}
            </div>
          )}

          <div className="mt-10 space-y-2 text-sm text-gray-500">
            <p>✓ Free shipping on orders over $50</p>
            <p>✓ 30-day return policy</p>
          </div>
        </div>
      </div>
    </main>
  );
}
