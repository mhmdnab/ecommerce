import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ name: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params;

  const categoryName = name.charAt(0).toUpperCase() + name.slice(1);

  const filtered = products.filter(
    (p) => p.category.toLowerCase() === name.toLowerCase()
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              image={p.image}
            />
          ))}
        </div>
      )}
    </main>
  );
}
