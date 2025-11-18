import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Shop Smart. Shop Stylish.
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Discover products that match your lifestyle. Quality items, great
            prices.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg text-lg"
          >
            Browse Products
          </Link>
        </div>

        <div className="flex-1">
          <Image
            src="/images/hero.jpg"
            alt="Shopping"
            width={500}
            height={400}
            className="rounded-xl shadow-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}
