import { ArrowRight, BadgeCheck, Package } from "lucide-react";
import Container from "./Container";
import { SectionHeader } from "./ui/SectionHeader";
import { Card } from "./ui/Card";

const steps = [
  {
    title: "Curate your cart",
    description:
      "Filter by category, budget, and vibe. Save favorites for later or compare quickly.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Instant checkout",
    description:
      "Secure payment, auto-filled shipping, and live delivery estimates—no extra forms.",
    icon: <ArrowRight className="h-5 w-5" />,
  },
  {
    title: "Track every mile",
    description:
      "Realtime status, delivery ETA, and proactive updates if anything changes.",
    icon: <Package className="h-5 w-5" />,
  },
];

export default function ShoppingSteps() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title="From browse to unbox in three smooth steps"
          description="No dead ends. No mystery fees. Just a clean path from discovery to delivery."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, idx) => (
            <Card key={step.title} className="relative bg-white">
              <div className="absolute right-6 top-6 text-xs font-semibold text-gray-400">
                0{idx + 1}
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-900 text-white">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

