export default function Newsletter() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-bold">Stay Updated</h2>
      <p className="text-gray-600 mt-2">
        Join our newsletter and be the first to know about new arrivals & sales.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-3 rounded-lg w-full"
        />
        <button className="bg-black text-white px-6 rounded-lg">
          Subscribe
        </button>
      </div>
    </section>
  );
}
