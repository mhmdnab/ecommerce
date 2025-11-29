"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { Product, getProducts } from "@/lib/api";

const categories = ["Clothing", "Shoes", "Accessories"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // mobile drawer
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const searchQuery = selectedCategory
          ? `${searchTerm} ${selectedCategory}`.trim()
          : searchTerm;
        const data = await getProducts({
          search: searchQuery || undefined,
          maxPrice,
          page,
          limit: 12,
        });
        setProducts(data.items || []);
        setPages(data.pages || 1);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load products.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, maxPrice, searchTerm, page]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, maxPrice, searchTerm]);

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory
      ? p.category === selectedCategory
      : true;
    const matchPrice = typeof p.price === "number" ? p.price <= maxPrice : true;
    return matchCategory && matchPrice;
  });

  return (
    <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Container className="py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeader
            eyebrow="Catalog"
            title="Everything we have on the floor"
            description="Use quick filters to narrow down your favorites. Save them for later or checkout now."
          />
          <div className="hidden md:flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Stock refreshed today
          </div>
        </div>

        <div className="md:hidden mb-4 flex justify-end">
          <Button
            onClick={() => setOpenFilters(true)}
            variant="secondary"
            size="md"
          >
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px,1fr]">
          <Card className="hidden h-fit md:block">
            <Filters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </Card>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <Card className="col-span-full text-center text-gray-600">
                <div className="space-y-3 py-10">
                  <p className="text-lg font-semibold">Loading products…</p>
                  <p className="text-sm text-gray-500">
                    Give us a second to fetch the catalog.
                  </p>
                </div>
              </Card>
            ) : error ? (
              <Card className="col-span-full text-center text-gray-600">
                <div className="space-y-3 py-8">
                  <p className="text-lg font-semibold">Couldn&apos;t load items</p>
                  <p className="text-sm text-gray-500">{error}</p>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      setPage(1);
                      setError(null);
                    }}
                  >
                    Retry
                  </Button>
                </div>
              </Card>
            ) : filteredProducts.length === 0 ? (
              <Card className="col-span-full text-center text-gray-600">
                <div className="space-y-3 py-8">
                  <p className="text-lg font-semibold">No products found</p>
                  <p className="text-sm text-gray-500">
                    Try clearing filters or searching for a different style.
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchTerm("");
                      setMaxPrice(1000);
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              </Card>
            ) : (
              filteredProducts.map((p) => (
                <ProductCard
                  key={p._id || p.id}
                  id={p._id || p.id || ""}
                  name={p.title}
                  price={p.price ?? 0}
                  image={p.images?.[0] || "/images/hero.jpg"}
                  description={p.description}
                />
              ))
            )}
          </section>
          {pages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button
                size="sm"
                variant="secondary"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </Button>
              <span className="text-sm font-semibold text-gray-700">
                Page {page} of {pages}
              </span>
              <Button
                size="sm"
                variant="secondary"
                disabled={page >= pages}
                onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </Container>

      {openFilters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur">
          <div className="relative h-full w-[85%] max-w-sm bg-white p-5 shadow-2xl">
            <button
              className="absolute right-4 top-4 text-gray-600"
              onClick={() => setOpenFilters(false)}
            >
              <X size={24} />
            </button>

            <Filters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <div className="mt-6 space-y-3">
              <Button
                fullWidth
                size="lg"
                onClick={() => setOpenFilters(false)}
              >
                Apply filters
              </Button>
              <Button
                fullWidth
                size="lg"
                variant="secondary"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                  setMaxPrice(200);
                  setOpenFilters(false);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Filters({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  searchTerm,
  setSearchTerm,
}: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

      <InputField
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                selectedCategory === cat
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-sm font-semibold text-gray-600 underline underline-offset-4"
        >
          Clear category
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
          <h3>Max price</h3>
          <span>${maxPrice}</span>
        </div>
        <input
          type="range"
          min={10}
          max={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-black"
        />
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>$10</span>
          <span>$1000</span>
        </div>
      </div>
    </div>
  );
}
