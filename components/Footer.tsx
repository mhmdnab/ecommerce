import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-20">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">ShopEase</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your destination for premium fashion items. Quality clothing, shoes,
            and accessories delivered fast.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4 mt-4">
            <Link href="#">
              <Facebook className="text-gray-600 hover:text-black transition" />
            </Link>
            <Link href="#">
              <Instagram className="text-gray-600 hover:text-black transition" />
            </Link>
            <Link href="#">
              <Twitter className="text-gray-600 hover:text-black transition" />
            </Link>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="/products" className="hover:text-black">
                Products
              </Link>
            </li>
            <li>
              <Link href="/category/clothing" className="hover:text-black">
                Clothing
              </Link>
            </li>
            <li>
              <Link href="/category/shoes" className="hover:text-black">
                Shoes
              </Link>
            </li>
            <li>
              <Link href="/category/accessories" className="hover:text-black">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Customer Service</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="#" className="hover:text-black">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-black">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-black">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-black">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Account</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="/auth/login" className="hover:text-black">
                Login
              </Link>
            </li>
            <li>
              <Link href="/auth/register" className="hover:text-black">
                Register
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-black">
                My Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
