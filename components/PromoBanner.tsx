import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="bg-black text-white py-14 text-center">
      <h2 className="text-3xl font-bold">🔥 Mega Sale: Up to 30% Off!</h2>
      <p className="mt-2 text-gray-300">Limited time only. Don’t miss out.</p>

      <Link
        href="/products"
        className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-lg text-lg font-semibold"
      >
        Shop Sale
      </Link>
    </section>
  );
}
