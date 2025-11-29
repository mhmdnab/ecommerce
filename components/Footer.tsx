import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-white">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">ShopEase</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Curated essentials that feel intentional. Built for people who like
            their shopping as smooth as their style.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#">
              <Facebook className="text-gray-500 hover:text-gray-900 transition" />
            </Link>
            <Link href="#">
              <Instagram className="text-gray-500 hover:text-gray-900 transition" />
            </Link>
            <Link href="#">
              <Twitter className="text-gray-500 hover:text-gray-900 transition" />
            </Link>
          </div>
        </div>

        <FooterColumn
          title="Shop"
          links={[
            { label: "Products", href: "/products" },
            { label: "Clothing", href: "/category/clothing" },
            { label: "Shoes", href: "/category/shoes" },
            { label: "Accessories", href: "/category/accessories" },
          ]}
        />
        <FooterColumn
          title="Support"
          links={[
            { label: "Contact us", href: "#" },
            { label: "Shipping info", href: "#" },
            { label: "Returns & refunds", href: "#" },
            { label: "FAQs", href: "#" },
          ]}
        />
        <FooterColumn
          title="Account"
          links={[
            { label: "Login", href: "/auth/login" },
            { label: "Register", href: "/auth/register" },
            { label: "My cart", href: "/cart" },
          ]}
        />
      </Container>

      <div className="border-t border-gray-100 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        {links.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="hover:text-gray-900">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
