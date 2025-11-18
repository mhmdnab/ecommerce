import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: Props) {
  return (
    <Link
      href={`/products/${id}`}
      className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition"
    >
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="rounded-md object-cover"
      />
      <h3 className="mt-3 text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">${price}</p>
    </Link>
  );
}
