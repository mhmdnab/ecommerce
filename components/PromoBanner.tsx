import Link from "next/link";
import Container from "./Container";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

export default function PromoBanner() {
  return (
    <section className="py-10">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 via-white to-amber-50 px-6 py-10 shadow-[0_15px_60px_rgba(255,193,7,0.25)]">
          <div className="absolute right-10 top-0 h-24 w-24 rounded-full bg-amber-200/50 blur-3xl" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Badge tone="warning">Just dropped</Badge>
              <h2 className="text-2xl font-bold text-gray-900">
                Up to 30% off selected styles this weekend.
              </h2>
              <p className="text-sm text-gray-700">
                Two-day window. Once it is gone, it is gone.
              </p>
            </div>
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Shop the sale
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
