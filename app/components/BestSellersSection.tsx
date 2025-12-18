"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./cart/CartProvider";
import { useMemo, useState } from "react";
import QuickViewModal, { type QuickViewProduct } from "./modals/QuickViewModal";
import { useToast } from "./toast/ToastProvider";

const CARD_IMAGES = ["/images/hair_hero.jpg", "/images/hair_hero1.png"] as const;

const bestSellers: QuickViewProduct[] = [
  {
    id: "bs-1",
    name: "HD Lace Frontal Wig (Body Wave)",
    price: 249,
    description:
      "Soft, natural density with a flawless hairline. Pre-bleached knots feel + beginner-friendly wear.",
    images: [CARD_IMAGES[0], CARD_IMAGES[1], CARD_IMAGES[0]],
    options: [
      { name: "Length", values: ["18\"", "20\"", "22\"", "24\""] },
      { name: "Lace", values: ["HD", "Transparent"] },
      { name: "Density", values: ["180%", "200%"] },
    ],
  },
  {
    id: "bs-2",
    name: "Raw Burmese Curly Bundles (3pc)",
    price: 189,
    description:
      "Defined curls with premium softness and minimal shedding. Perfect for full installs or custom units.",
    images: [CARD_IMAGES[1], CARD_IMAGES[0], CARD_IMAGES[1]],
    options: [
      { name: "Length", values: ["16\"", "18\"", "20\"", "22\""] },
      { name: "Bundles", values: ["3pc", "4pc"] },
    ],
  },
  {
    id: "bs-3",
    name: "Transparent Lace Closure (4x4)",
    price: 79,
    description:
      "Natural parting space with clean blending. Great for low-maintenance installs and protective styling.",
    images: [CARD_IMAGES[0], CARD_IMAGES[1]],
    options: [
      { name: "Texture", values: ["Straight", "Body Wave", "Curly"] },
      { name: "Color", values: ["Natural", "1B"] },
    ],
  },
  {
    id: "bs-4",
    name: "Straight Wig – Glueless Ready",
    price: 219,
    description:
      "Silky straight finish with an effortless melt. Adjustable band + combs for secure daily wear.",
    images: [CARD_IMAGES[1], CARD_IMAGES[0]],
    options: [
      { name: "Length", values: ["18\"", "20\"", "22\""] },
      { name: "Lace", values: ["HD", "Transparent"] },
    ],
  },
  {
    id: "bs-5",
    name: "Deep Wave Bundles (3pc)",
    price: 169,
    description:
      "Bouncy deep wave pattern that stays defined. Easy to refresh with water + mousse.",
    images: [CARD_IMAGES[0], CARD_IMAGES[1]],
    options: [
      { name: "Length", values: ["16\"", "18\"", "20\"", "22\""] },
      { name: "Bundles", values: ["3pc", "4pc"] },
    ],
  },
  {
    id: "bs-6",
    name: "HD Lace Frontal (13x4)",
    price: 119,
    description:
      "Wide lace space for versatile styling. Ultra-thin HD lace for the most natural blend.",
    images: [CARD_IMAGES[1], CARD_IMAGES[0]],
    options: [
      { name: "Texture", values: ["Straight", "Body Wave", "Curly"] },
      { name: "Color", values: ["Natural", "1B"] },
    ],
  },
  {
    id: "bs-7",
    name: "Kinky Curly Wig – Natural Look",
    price: 239,
    description:
      "Natural texture with gorgeous volume. Perfect for effortless wash-and-go styling.",
    images: [CARD_IMAGES[0], CARD_IMAGES[1]],
    options: [
      { name: "Length", values: ["16\"", "18\"", "20\""] },
      { name: "Density", values: ["180%", "200%"] },
    ],
  },
  {
    id: "bs-8",
    name: "Closure Wig – Beginner Friendly",
    price: 199,
    description:
      "Easy install with a natural finish. Designed for comfort, security, and quick styling.",
    images: [CARD_IMAGES[1], CARD_IMAGES[0]],
    options: [
      { name: "Length", values: ["18\"", "20\"", "22\""] },
      { name: "Texture", values: ["Straight", "Body Wave"] },
    ],
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function BestSellersSection() {
  const { addItem } = useCart();
  const { show } = useToast();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  const activeProduct = useMemo(
    () => bestSellers.find((p) => p.id === activeProductId) ?? null,
    [activeProductId]
  );

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2
                className="text-3xl sm:text-4xl text-primary italic leading-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Best Sellers
              </h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Shop our most-loved pieces—premium textures, effortless installs,
                and styles that stay flawless.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              See more products <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((p) => (
              <article
                key={p.id}
                className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                  <Image
                    src={p.images[0] ?? CARD_IMAGES[0]}
                    alt={p.name}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/5" />

                  <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-primary backdrop-blur-sm">
                    Best Seller
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[15px] font-medium text-neutral-900 leading-snug">
                      {p.name}
                    </h3>
                    <div className="shrink-0 text-[15px] font-semibold text-primary">
                      {formatPrice(p.price)}
                    </div>
                  </div>

                  <div className="mt-4 h-px w-full bg-neutral-100" />

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveProductId(p.id);
                        setQuickViewOpen(true);
                      }}
                      className="rounded-xl border border-neutral-200 bg-white text-sm font-medium py-3 text-neutral-900 hover:bg-neutral-50 transition-colors"
                    >
                      Quick view
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        (() => {
                          addItem({ id: p.id, name: p.name, price: p.price }, 1);
                          show(
                            { title: "Added to cart", description: p.name },
                            { durationMs: 3200 }
                          );
                        })()
                      }
                      className="rounded-xl bg-primary text-white text-sm font-medium py-3 hover:bg-primary-hover transition-colors"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <QuickViewModal
        open={quickViewOpen}
        product={activeProduct}
        onClose={() => setQuickViewOpen(false)}
        onAddToCart={({ product, qty, variantLabel, variantId }) => {
          addItem(
            {
              id: `${product.id}:${variantId}`,
              name: product.name,
              price: product.price,
              variant: variantLabel,
            },
            qty
          );
          show(
            { title: "Added to cart", description: `${product.name} (${variantLabel})` },
            { durationMs: 3200 }
          );
          setQuickViewOpen(false);
        }}
      />
    </section>
  );
}


