import Categories from "@/components/Categories";
import CTA from "@/components/CTA";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import PromoBanner from "@/components/PromoBanner";
export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <Newsletter />
    </main>
  );
}
