"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./cart/CartProvider";

const navItems = [
  { name: "Home", href: "/", hasDropdown: false },
  { name: "Shop All", href: "/shop", hasDropdown: false },
  { name: "Our Story", href: "/our-story", hasDropdown: false },
  { name: "Pages", href: "#", hasDropdown: true },
];

export default function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    closeBtnRef.current?.focus();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const scrollY = window.scrollY || 0;
    const body = document.body;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white w-full relative">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between py-5 px-6 lg:px-12">
        {/* Logo */}
        <div className="shrink-0">
          <div className="flex flex-col">
            <span
              className="text-3xl font-bold text-primary tracking-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              PB
            </span>
            <span className="text-[9px] text-primary tracking-[0.25em] uppercase -mt-1 font-medium">
              PonyClub
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
          <button
            type="button"
            className="md:hidden text-primary hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Search */}
          <button className="text-primary hover:opacity-70 transition-opacity">
            <Search size={22} strokeWidth={1.5} />
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            className="relative text-primary hover:opacity-70 transition-opacity"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-[70] ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute right-0 top-0 z-10 h-full w-[85%] max-w-xs shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "#fff" }}
        >
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <div className="text-lg font-semibold text-primary">Menu</div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col p-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between border-b border-neutral-100 py-4 text-base transition-colors ${
                  pathname === item.href
                    ? "text-primary font-medium"
                    : "text-primary/80"
                }`}
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown size={16} />}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}
