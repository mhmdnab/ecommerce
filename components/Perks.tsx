import { ShieldCheck, Sparkles, Truck } from "lucide-react";
import Container from "./Container";
import { SectionHeader } from "./ui/SectionHeader";
import { Card } from "./ui/Card";

const perks = [
  {
    title: "Fast, free delivery",
    description: "Express shipping on orders over $50 with live tracking.",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "Curated quality",
    description: "Every item is vetted by our stylists before it ships.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Protected checkout",
    description: "Secure payments with buyer protection on every order.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

export default function Perks() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          eyebrow="Why ShopEase"
          title="Premium experience without the premium hassle"
          description="Perks built into every order so you can shop confidently."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk) => (
            <Card key={perk.title} className="bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
                  {perk.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {perk.title}
                  </h3>
                  <p className="text-sm text-gray-600">{perk.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

