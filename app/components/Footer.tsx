"use client";

import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const quickLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Wigs", href: "/wigs" },
  { label: "Bundles", href: "/bundles" },
  { label: "Closures & Frontals", href: "/frontal-closure" },
];

const helpLinks = [
  { label: "Shipping & Delivery", href: "#" },
  { label: "Returns & Exchanges", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f1416] text-white/80">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex flex-col">
              <span
                className="text-3xl font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                fab.
              </span>
              <span className="text-[10px] text-white/70 tracking-[0.25em] uppercase -mt-1 font-medium">
                Skin Science
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Premium hair crafted for confidence—modern textures, seamless
              blends, and luxury you can feel.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:hello@example.com"
                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-sm font-semibold text-white">Shop</div>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Help</div>
            <ul className="mt-4 space-y-3 text-sm">
              {helpLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="text-sm font-semibold text-white">Newsletter</div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Subscribe for drops, restocks, and exclusive offers.
            </p>

            <form
              className="mt-5 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
              >
                Join
              </button>
            </form>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/70">
                <Phone size={16} className="text-primary" />
                <span>+1 (000) 000-0000</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin size={16} className="text-primary" />
                <span>Worldwide shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-white/60">
          <div>© {new Date().getFullYear()} fab. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


