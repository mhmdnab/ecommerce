import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
}: Props) {
  return (
    <Link href={`/products/${id}`} className="h-full">
      <Card className="group h-full overflow-hidden bg-gradient-to-br from-white to-gray-50">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={name}
            fill
            sizes="320px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
          <div className="absolute left-3 top-3">
            <Badge tone="neutral">New</Badge>
          </div>
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
              ${price}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              {description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400 transition group-hover:text-gray-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <div className="text-sm font-semibold text-gray-800">
            ${price.toFixed(2)}
          </div>
        </div>
      </Card>
    </Link>
  );
}
