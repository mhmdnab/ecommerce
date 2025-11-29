"use client";
import Link from "next/link";
import Container from "./Container";
import ProductCard from "./ProductCard";
import { SectionHeader } from "./ui/SectionHeader";
import { useEffect, useState } from "react";
import { Product, getProducts } from "@/lib/api";

export default function FeaturedProducts() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await getProducts({ limit: 3 });
        setItems(data.items || []);
      } catch (err) {
        console.error("Failed to load featured products", err);
      }
    };

    loadFeatured();
  }, []);

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeader
            eyebrow="Featured"
            title="Staff picks to fast-track your cart"
            description="The pieces our team is wearing on repeat this month."
          />
          <Link
            href="/products"
            className="text-sm font-semibold text-gray-900 underline underline-offset-4"
          >
            View full catalog
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((p) => (
            <ProductCard
              key={p._id || p.id}
              id={p._id || p.id || ""}
              name={p.title}
              price={p.price ?? 0}
              image={p.images?.[0] || "/images/hero.jpg"}
              description={p.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
