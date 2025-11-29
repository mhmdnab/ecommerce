"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Card } from "@/components/ui/Card";
import { Product, getProducts } from "@/lib/api";

export default function CategoryPage() {
  const params = useParams<{ name: string }>();
  const name = useMemo(
    () =>
      typeof params?.name === "string"
        ? params.name
        : Array.isArray(params?.name)
          ? params.name[0]
          : "",
    [params?.name]
  );

  const categoryName =
    name.length > 0 ? name.charAt(0).toUpperCase() + name.slice(1) : "Category";

  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!name) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts({ search: name, limit: 30 });
        const filtered = data.items?.filter(
          (p) =>
            !p.category ||
            p.category.toLowerCase() === name.toLowerCase()
        );
        setItems(filtered || data.items || []);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to load this category right now.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [name]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">{categoryName}</h1>

      {loading ? (
        <Card className="p-8 text-center text-gray-600">
          <p className="text-lg font-semibold">Loading products…</p>
        </Card>
      ) : error ? (
        <Card className="p-8 text-center text-gray-600">
          <p className="text-lg font-semibold">{error}</p>
        </Card>
      ) : items.length === 0 ? (
        <p className="text-gray-600">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((p) => (
            <ProductCard
              key={p._id || p.id}
              id={p._id || p.id || ""}
              name={p.title}
              price={p.price ?? 0}
              image={p.images?.[0] || "/images/hero.jpg"}
            />
          ))}
        </div>
      )}
    </main>
  );
}
