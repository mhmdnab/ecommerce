import Categories from "@/components/Categories";
import CTA from "@/components/CTA";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import PromoBanner from "@/components/PromoBanner";
import Perks from "@/components/Perks";
import ShoppingSteps from "@/components/ShoppingSteps";
import Testimonials from "@/components/Testimonials";
export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Perks />
      <FeaturedProducts />
      <Categories />
      <ShoppingSteps />
      <PromoBanner />
      <CTA />
      <Newsletter />
      <Testimonials />
    </main>
  );
}
