"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import Container from "./Container";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/hero.jpg"
          alt="Shopping background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/80 to-transparent" />
      <div className="absolute -right-12 top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <Container className="relative grid min-h-[540px] items-center gap-12 py-16 md:grid-cols-2">
        <div className="space-y-6">
          <Badge tone="neutral">New season edit</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Elevate your daily kit with curated essentials.
          </h1>
          <p className="max-w-2xl text-lg text-gray-200">
            Premium fabrics, sharp silhouettes, and tech-forward accessories
            that move with you—from first meeting to after hours.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/products">
              <Button size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Shop bestsellers
              </Button>
            </Link>
            <Link href="/category">
              <Button variant="ghost" size="lg">
                Browse categories
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat label="48h shipping" icon={<Clock className="h-4 w-4" />} />
            <Stat label="Handpicked drops" icon={<Sparkles className="h-4 w-4" />} />
            <Stat label="Buyer protection" icon={<ShieldCheck className="h-4 w-4" />} />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -right-8 -bottom-8 h-36 w-36 rounded-full bg-amber-200/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur">
            <Image
              src="/images/sneakers.jpg"
              alt="Featured sneakers"
              width={520}
              height={520}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center justify-between text-sm text-gray-200">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]">
                    Spotlight
                  </p>
                  <p className="text-lg font-semibold text-white">
                    Atmos Runner 2.0
                  </p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900">
                  $180
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 backdrop-blur">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
        {icon}
      </div>
      <span>{label}</span>
    </div>
  );
}
