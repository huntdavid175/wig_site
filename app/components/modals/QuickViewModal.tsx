"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type ProductOption = {
  name: string;
  values: string[];
};

export type QuickViewProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  options: ProductOption[];
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function buildVariantLabel(
  options: ProductOption[],
  selections: Record<string, string>
) {
  return options
    .map((o) => `${o.name}: ${selections[o.name] ?? o.values[0]}`)
    .join(" · ");
}

export default function QuickViewModal({
  open,
  product,
  onClose,
  onAddToCart,
}: {
  open: boolean;
  product: QuickViewProduct | null;
  onClose: () => void;
  onAddToCart: (args: {
    product: QuickViewProduct;
    qty: number;
    variantLabel: string;
    variantId: string;
  }) => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});

  // Reset when opening / switching product
  useEffect(() => {
    if (!open || !product) return;
    setActiveImage(0);
    setQty(1);
    const defaults: Record<string, string> = {};
    for (const opt of product.options) defaults[opt.name] = opt.values[0] ?? "";
    setSelections(defaults);
  }, [open, product?.id]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Prevent background page from scrolling while modal is open (mobile-friendly)
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY || 0;
    const body = document.body;

    // Lock the body in place without jumping
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
  }, [open]);

  const variantLabel = useMemo(() => {
    if (!product) return "";
    return buildVariantLabel(product.options, selections);
  }, [product, selections]);

  const variantId = useMemo(() => {
    if (!product) return "";
    // Stable-ish key from selections
    const parts = product.options.map((o) => `${o.name}=${selections[o.name]}`);
    return parts.join("|");
  }, [product, selections]);

  if (!open || !product) return null;

  const images = product.images?.length ? product.images : ["/images/hair_hero.jpg"];

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close quick view"
      />

      {/* Panel */}
      <div className="absolute inset-0 flex items-start sm:items-center justify-center p-4 sm:p-6">
        <div className="no-scrollbar relative w-full max-w-5xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-2xl [webkit-overflow-scrolling:touch]">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-neutral-700 hover:bg-white transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery */}
            <div className="bg-neutral-100 p-0 sm:p-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-none sm:rounded-2xl bg-neutral-100">
                <Image
                  src={images[Math.min(activeImage, images.length - 1)]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>

              <div className="mt-4 px-4 sm:px-0 flex gap-3 overflow-x-auto pb-1">
                {images.slice(0, 6).map((src, idx) => (
                  <button
                    key={`${src}-${idx}`}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition ${
                      idx === activeImage
                        ? "border-primary"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl text-neutral-900 leading-tight">
                {product.name}
              </h3>
              <div className="mt-2 text-xl font-semibold text-primary">
                {formatPrice(product.price)}
              </div>

              <p className="mt-5 text-sm sm:text-base text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Options */}
              <div className="mt-7 space-y-5">
                {product.options.map((opt) => (
                  <div key={opt.name}>
                    <div className="text-sm font-medium text-neutral-900">
                      {opt.name}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {opt.values.map((v) => {
                        const selected = selections[opt.name] === v;
                        return (
                          <button
                            key={v}
                            type="button"
                            onClick={() =>
                              setSelections((prev) => ({ ...prev, [opt.name]: v }))
                            }
                            className={`rounded-full px-4 py-2 text-sm border transition ${
                              selected
                                ? "border-primary bg-primary text-white"
                                : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300"
                            }`}
                          >
                            {v}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Qty + Add */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="inline-flex items-center rounded-xl border border-neutral-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 text-neutral-900 hover:bg-neutral-50"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="px-5 py-3 text-sm font-medium text-neutral-900">
                    {qty}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="px-4 py-3 text-neutral-900 hover:bg-neutral-50"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart({ product, qty, variantLabel, variantId })}
                  className="flex-1 rounded-xl bg-primary text-white py-3 text-sm font-medium hover:bg-primary-hover transition-colors"
                >
                  Add to cart
                </button>
              </div>

              <div className="mt-3 text-xs text-neutral-500">
                Selected: <span className="text-neutral-700">{variantLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


