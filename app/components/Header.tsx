"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "./cart/CartProvider";

const navItems = [
  { name: "Home", href: "/", hasDropdown: false },
  { name: "Shop All", href: "/shop", hasDropdown: false },
  { name: "Our Story", href: "/our-story", hasDropdown: false },
  { name: "Pages", href: "#", hasDropdown: true },
];

export default function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="bg-white w-full">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between py-5 px-6 lg:px-12">
        {/* Logo */}
        <div className="shrink-0">
          <div className="flex flex-col">
            <span
              className="text-3xl font-bold text-primary tracking-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              fab.
            </span>
            <span className="text-[9px] text-primary tracking-[0.25em] uppercase -mt-1 font-medium">
              Skin Science
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-1 text-[15px] transition-colors ${
                pathname === item.href
                  ? "text-primary font-medium"
                  : "text-primary opacity-80 hover:opacity-100"
              }`}
            >
              <span
                className={
                  pathname === item.href ? "underline underline-offset-4" : ""
                }
              >
                {item.name}
              </span>
              {item.hasDropdown && <ChevronDown size={16} />}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button className="text-primary hover:opacity-70 transition-opacity">
            <Search size={22} strokeWidth={1.5} />
          </button>

          {/* Cart */}
          <button className="relative text-primary hover:opacity-70 transition-opacity">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
              {itemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
