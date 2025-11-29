import Container from "./Container";
import { SectionHeader } from "./ui/SectionHeader";
import { InputField } from "./ui/InputField";
import { Button } from "./ui/Button";

export default function Newsletter() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <div className="grid gap-8 md:grid-cols-[1.2fr,1fr] md:items-center">
            <SectionHeader
              eyebrow="Newsletter"
              title="Stay ahead of the drops"
              description="Get first dibs on limited releases, styling notes, and invites to members-only events."
            />

            <div className="space-y-4">
              <InputField
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <Button fullWidth size="lg">
                Subscribe
              </Button>
              <p className="text-xs text-gray-500">
                We respect your inbox. Expect 1-2 quality emails a month.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
