import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">Ready to Discover More?</h2>
        <p className="mt-3 text-gray-300">
          Explore our full catalog of amazing products.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-lg text-lg font-medium"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
