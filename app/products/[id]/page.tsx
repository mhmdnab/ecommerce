import { products } from "@/data/products";
import Image from "next/image";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: Params) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product)
    return <h1 className="p-6 text-center text-2xl">Product not found</h1>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-2xl mt-4 font-semibold text-gray-800">
            ${product.price}
          </p>

          <p className="mt-5 text-gray-600 leading-relaxed text-lg">
            {product.description}
          </p>

          {/* Add to cart */}
          <button className="mt-8 bg-black text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-800 transition w-fit">
            Add to Cart
          </button>

          {/* Additional small details */}
          <div className="mt-10 space-y-2 text-gray-500 text-sm">
            <p>✓ Free shipping on orders over $50</p>
            <p>✓ 30-day return policy</p>
          </div>
        </div>
      </div>
    </main>
  );
}
