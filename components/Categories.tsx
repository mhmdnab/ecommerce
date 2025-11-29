import Link from "next/link";
import { Watch, Shirt, ShoppingBag } from "lucide-react";
import Container from "./Container";
import { SectionHeader } from "./ui/SectionHeader";
import { Card } from "./ui/Card";

const categories = [
  {
    name: "Clothing",
    description: "Breathable layers, sharp tailoring, and effortless basics.",
    icon: <Shirt className="h-6 w-6" />,
  },
  {
    name: "Shoes",
    description: "Statement sneakers, city-ready boots, and comfort staples.",
    icon: <ShoppingBag className="h-6 w-6" />,
  },
  {
    name: "Accessories",
    description: "Carryalls, tech gear, and finishing touches that stand out.",
    icon: <Watch className="h-6 w-6" />,
  },
];

export default function Categories() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          eyebrow="Shop by category"
          title="Dial in your wardrobe by what matters today"
          description="Narrow your search without losing the thrill of discovery."
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((c) => {
            const slug = c.name.toLowerCase();

            return (
              <Card
                key={c.name}
                className="group h-full bg-gradient-to-br from-white to-gray-50 transition hover:-translate-y-1"
              >
                <Link
                  href={`/category/${slug}`}
                  className="flex h-full flex-col gap-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-lg shadow-black/10">
                    {c.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {c.name}
                    </h3>
                    <p className="text-sm text-gray-600">{c.description}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-gray-900">
                    Explore {c.name}
                    <span aria-hidden className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
