"use client";

import { Check, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../components/cart/CartProvider";
import { useToast } from "../components/toast/ToastProvider";
import QuickViewModal, {
  type QuickViewProduct,
} from "../components/modals/QuickViewModal";

type Product = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  colors: string[]; // names
  imageUrl: string;
  images?: string[];
};

const PRODUCTS: Product[] = [
  {
    id: "p-1",
    name: "HD Lace Frontal Wig (Body Wave)",
    price: 249,
    salePrice: 219,
    colors: ["Natural", "1B"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero.jpg", "/images/hair_hero1.png", "/images/hair_hero.jpg"],
  },
  {
    id: "p-2",
    name: "Raw Burmese Curly Bundles (3pc)",
    price: 189,
    colors: ["Natural", "1B"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero1.png", "/images/hair_hero.jpg", "/images/hair_hero1.png"],
  },
  {
    id: "p-3",
    name: "Transparent Lace Closure (4x4)",
    price: 79,
    salePrice: 69,
    colors: ["Natural"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero.jpg", "/images/hair_hero1.png"],
  },
  {
    id: "p-4",
    name: "Straight Wig – Glueless Ready",
    price: 219,
    colors: ["Natural", "1B", "2"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero1.png", "/images/hair_hero.jpg"],
  },
  {
    id: "p-5",
    name: "Deep Wave Bundles (3pc)",
    price: 169,
    salePrice: 149,
    colors: ["Natural", "1B", "4"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero.jpg", "/images/hair_hero1.png"],
  },
  {
    id: "p-6",
    name: "HD Lace Frontal (13x4)",
    price: 119,
    colors: ["Natural"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero1.png", "/images/hair_hero.jpg"],
  },
  {
    id: "p-7",
    name: "Kinky Curly Wig – Natural Look",
    price: 239,
    colors: ["Natural", "1B"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero.jpg", "/images/hair_hero1.png"],
  },
  {
    id: "p-8",
    name: "Closure Wig – Beginner Friendly",
    price: 199,
    salePrice: 179,
    colors: ["Natural", "1B", "2"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero1.png", "/images/hair_hero.jpg"],
  },
  {
    id: "p-9",
    name: "HD Lace Frontal Wig (Curly)",
    price: 259,
    colors: ["Natural", "1B"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero.jpg", "/images/hair_hero1.png"],
  },
  {
    id: "p-10",
    name: "Body Wave Bundles (4pc)",
    price: 229,
    salePrice: 199,
    colors: ["Natural", "1B", "4"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero1.png", "/images/hair_hero.jpg"],
  },
  {
    id: "p-11",
    name: "Lace Closure (5x5) – HD",
    price: 99,
    colors: ["Natural"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero.jpg", "/images/hair_hero1.png"],
  },
  {
    id: "p-12",
    name: "Straight Bundles (3pc)",
    price: 159,
    colors: ["Natural", "1B", "2"],
    imageUrl: "/images/hair_hero.jpg",
    images: ["/images/hair_hero1.png", "/images/hair_hero.jpg"],
  },
];

const COLOR_SWATCH: Record<string, string> = {
  Natural: "#c8a07d",
  "1B": "#1f1f1f",
  "2": "#3a2f27",
  "4": "#6b4b34",
};

type SortKey = "featured" | "price_asc" | "price_desc" | "name_asc";

function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function effectivePrice(p: Product) {
  return p.salePrice ?? p.price;
}

function uniqueColors(products: Product[]) {
  const set = new Set<string>();
  for (const p of products) for (const c of p.colors) set.add(c);
  return Array.from(set);
}

function toQuickViewProduct(p: Product): QuickViewProduct {
  const price = effectivePrice(p);
  return {
    id: p.id,
    name: p.name,
    price,
    description:
      "Premium hair crafted for comfort, softness, and long-lasting wear. Select your options below and add to cart.",
    images:
      p.images?.length && p.images.some(Boolean)
        ? p.images
        : [p.imageUrl, "/images/hair_hero1.png", p.imageUrl],
    options: [
      { name: "Length", values: ['16"', '18"', '20"', '22"'] },
      { name: "Color", values: p.colors.length ? p.colors : ["Natural"] },
    ],
  };
}

function FilterSidebar({
  allColors,
  selectedColors,
  onToggleColor,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  onlySale,
  setOnlySale,
  onClear,
}: {
  allColors: string[];
  selectedColors: Set<string>;
  onToggleColor: (c: string) => void;
  minPrice: number | "";
  maxPrice: number | "";
  setMinPrice: (v: number | "") => void;
  setMaxPrice: (v: number | "") => void;
  onlySale: boolean;
  setOnlySale: (v: boolean) => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-neutral-900">Filters</div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
        >
          Clear
        </button>
      </div>

      {/* Colors */}
      <div className="mt-6">
        <div className="text-xs font-semibold text-neutral-900 uppercase tracking-wide">
          Colors
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {allColors.map((c) => {
            const active = selectedColors.has(c);
            const swatch = COLOR_SWATCH[c] ?? "#d4d4d4";
            return (
              <button
                key={c}
                type="button"
                onClick={() => onToggleColor(c)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                  active
                    ? "border-primary bg-primary/5 text-neutral-900"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                }`}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: swatch }}
                />
                <span>{c}</span>
                {active ? <Check size={16} className="text-primary" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div className="mt-6">
        <div className="text-xs font-semibold text-neutral-900 uppercase tracking-wide">
          Price
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="text-xs text-neutral-600">
            Min
            <input
              type="number"
              inputMode="numeric"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-primary"
              placeholder="0"
              min={0}
            />
          </label>
          <label className="text-xs text-neutral-600">
            Max
            <input
              type="number"
              inputMode="numeric"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-primary"
              placeholder="999"
              min={0}
            />
          </label>
        </div>
      </div>

      {/* Sale */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setOnlySale(!onlySale)}
          className="flex items-center justify-between w-full rounded-xl border border-neutral-200 px-4 py-3 hover:bg-neutral-50 transition"
        >
          <div className="text-sm font-medium text-neutral-900">
            Only show sale items
          </div>
          <span
            className={`h-5 w-5 rounded-md border flex items-center justify-center ${
              onlySale ? "border-primary bg-primary" : "border-neutral-300 bg-white"
            }`}
            aria-hidden
          >
            {onlySale ? <Check size={14} className="text-white" /> : null}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function ShopClient() {
  const { addItem } = useCart();
  const { show } = useToast();

  const allColors = useMemo(() => uniqueColors(PRODUCTS), []);
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [onlySale, setOnlySale] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedColors.size > 0) {
      list = list.filter((p) => p.colors.some((c) => selectedColors.has(c)));
    }

    if (onlySale) {
      list = list.filter((p) => typeof p.salePrice === "number");
    }

    if (minPrice !== "") {
      list = list.filter((p) => effectivePrice(p) >= minPrice);
    }

    if (maxPrice !== "") {
      list = list.filter((p) => effectivePrice(p) <= maxPrice);
    }

    switch (sort) {
      case "price_asc":
        list.sort((a, b) => effectivePrice(a) - effectivePrice(b));
        break;
      case "price_desc":
        list.sort((a, b) => effectivePrice(b) - effectivePrice(a));
        break;
      case "name_asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured: keep order
        break;
    }

    return list;
  }, [selectedColors, minPrice, maxPrice, onlySale, sort]);

  // Reset pagination when filters/sort change
  useEffect(() => {
    setPage(1);
  }, [selectedColors, minPrice, maxPrice, onlySale, sort]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / pageSize)),
    [filtered.length]
  );

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const showingFrom = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = Math.min(page * pageSize, filtered.length);

  const activeProduct = useMemo(() => {
    const p = PRODUCTS.find((x) => x.id === activeProductId);
    return p ? toQuickViewProduct(p) : null;
  }, [activeProductId]);

  const toggleColor = (c: string) => {
    setSelectedColors((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedColors(new Set());
    setMinPrice("");
    setMaxPrice("");
    setOnlySale(false);
  };

  const getPageButtons = () => {
    // small, nice set of page buttons (with ellipsis)
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
    const inRange = (n: number) => n >= 1 && n <= totalPages;
    const list = Array.from(pages).filter(inRange).sort((a, b) => a - b);

    const result: (number | "…")[] = [];
    for (let i = 0; i < list.length; i++) {
      const curr = list[i];
      const prev = list[i - 1];
      if (i > 0 && curr - prev > 1) result.push("…");
      result.push(curr);
    }
    return result;
  };

  return (
    <div className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col gap-2">
          <h1
            className="text-4xl sm:text-5xl text-primary italic"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Shop
          </h1>
          <p className="text-neutral-600">
            Browse our collection. Filter by color, price, or shop the current deals.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            <div className="text-sm text-neutral-600">
              <span className="font-medium text-neutral-900">{filtered.length}</span>{" "}
              products
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-neutral-600">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="ml-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-900 bg-white outline-none focus:border-primary"
              >
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A-Z</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-6 self-start max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar">
              <FilterSidebar
                allColors={allColors}
                selectedColors={selectedColors}
                onToggleColor={toggleColor}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                onlySale={onlySale}
                setOnlySale={setOnlySale}
                onClear={clearFilters}
              />
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((p) => {
              const onSale = typeof p.salePrice === "number";
              return (
                <article
                  key={p.id}
                  className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="relative aspect-[4/5] bg-neutral-100"
                    style={{
                      backgroundImage: `url(${p.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {onSale ? (
                      <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-primary backdrop-blur-sm">
                        Sale
                      </div>
                    ) : null}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-[15px] font-medium text-neutral-900 leading-snug">
                        {p.name}
                      </h3>
                      <div className="shrink-0 text-right">
                        {onSale ? (
                          <div className="text-xs text-neutral-500 line-through">
                            {money(p.price)}
                          </div>
                        ) : null}
                        <div className="text-[15px] font-semibold text-primary">
                          {money(effectivePrice(p))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      {p.colors.slice(0, 4).map((c) => (
                        <span
                          key={c}
                          className="h-3.5 w-3.5 rounded-full border border-black/10"
                          title={c}
                          style={{ backgroundColor: COLOR_SWATCH[c] ?? "#d4d4d4" }}
                        />
                      ))}
                      {p.colors.length > 4 ? (
                        <span className="text-xs text-neutral-500">
                          +{p.colors.length - 4}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
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
                        onClick={() => {
                          addItem(
                            { id: p.id, name: p.name, price: effectivePrice(p) },
                            1
                          );
                          show({ title: "Added to cart", description: p.name });
                        }}
                        className="rounded-xl bg-primary text-white text-sm font-medium py-3 hover:bg-primary-hover transition-colors"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              );
              })}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-neutral-600">
                Showing{" "}
                <span className="font-medium text-neutral-900">
                  {showingFrom}–{showingTo}
                </span>{" "}
                of{" "}
                <span className="font-medium text-neutral-900">
                  {filtered.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition"
                >
                  Prev
                </button>

                <div className="flex items-center gap-1">
                  {getPageButtons().map((p, idx) =>
                    p === "…" ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 text-neutral-400"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        aria-current={p === page ? "page" : undefined}
                        className={`h-10 w-10 rounded-xl text-sm font-medium transition ${
                          p === page
                            ? "bg-primary text-white"
                            : "border border-neutral-200 text-neutral-900 hover:bg-neutral-50"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition"
                >
                  Next
                </button>
              </div>
            </div>
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
          show({
            title: "Added to cart",
            description: `${product.name} (${variantLabel})`,
          });
          setQuickViewOpen(false);
        }}
      />

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Close filters"
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-5 shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-900">Filters</div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="text-sm text-primary underline underline-offset-4"
              >
                Done
              </button>
            </div>

            <div className="mt-4">
              <FilterSidebar
                allColors={allColors}
                selectedColors={selectedColors}
                onToggleColor={toggleColor}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                onlySale={onlySale}
                setOnlySale={setOnlySale}
                onClear={clearFilters}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}


