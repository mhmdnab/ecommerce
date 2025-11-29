import Link from "next/link";
import Container from "./Container";
import { Button } from "./ui/Button";

export default function CTA() {
  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-black px-8 py-12 text-white shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
          <div className="absolute right-10 top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-8 left-10 h-28 w-28 rounded-full bg-amber-200/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300">
                Limited time
              </p>
              <h2 className="text-3xl font-bold">
                Ready to find your next go-to piece?
              </h2>
              <p className="text-gray-200">
                Explore drops curated by stylists. Shipping moves fast, so you
                can too.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/products">
                <Button size="lg" variant="ghost">
                  Shop the collection
                </Button>
              </Link>
              <Link href="/category">
                <Button size="lg" variant="quiet">
                  Browse categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
