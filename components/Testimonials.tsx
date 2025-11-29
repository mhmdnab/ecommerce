import Container from "./Container";
import { SectionHeader } from "./ui/SectionHeader";
import { Card } from "./ui/Card";

const testimonials = [
  {
    name: "Amelia Hart",
    title: "Creative Director",
    quote:
      "The curation is spot on. I can trust everything here to feel premium without spending hours comparing.",
  },
  {
    name: "Jordan Lee",
    title: "Product Designer",
    quote:
      "Checkout was frictionless and the order updates were timely. Easily my favorite shop experience this year.",
  },
  {
    name: "Priya Patel",
    title: "Runner & Traveler",
    quote:
      "Fast delivery, clear sizing, and great support. I have already sent the link to three friends.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <Container>
        <SectionHeader
          eyebrow="Trusted by shoppers"
          title="Real people, real praise"
          description="We obsess over the details so every delivery feels like an upgrade."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="h-full">
              <div className="flex h-full flex-col gap-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  “{item.quote}”
                </p>
                <div className="mt-auto">
                  <p className="text-base font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">{item.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
