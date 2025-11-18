import Link from "next/link";

const categories = [
  { name: "Clothing" },
  { name: "Shoes" },
  { name: "Accessories" },
];

export default function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((c) => {
          const slug = c.name.toLowerCase();

          return (
            <Link
              key={c.name}
              href={`/category/${slug}`}
              className="border p-6 rounded-xl hover:shadow-lg transition bg-white text-center"
            >
              <h3 className="text-xl font-semibold">{c.name}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
