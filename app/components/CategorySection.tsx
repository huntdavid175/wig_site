"use client";

import Image from "next/image";
import Link from "next/link";

type CategoryCard = {
  title: string;
  cta: string;
  href: string;
  imageUrl: string;
};

const categories: CategoryCard[] = [
  {
    title: "WIGS",
    cta: "SHOP NOW",
    href: "/wigs",
    imageUrl: "/images/hair_hero.jpg",
  },
  {
    title: "BUNDLES",
    cta: "SHOP NOW",
    href: "/bundles",
    imageUrl: "/images/hair_hero1.png",
  },
  {
    title: "FRONTAL & CLOSURE",
    cta: "SHOP NOW",
    href: "/frontal-closure",
    imageUrl: "/images/hair_hero.jpg",
  },
  {
    title: "BUNDLES & CLOSURE DEALS",
    cta: "COMING SOON",
    href: "/deals",
    imageUrl: "/images/hair_hero1.png",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative overflow-hidden rounded-2xl bg-neutral-100 shadow-sm"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={cat.imageUrl}
                  alt={cat.title}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/15 via-black/5 to-black/20" />
              </div>

              {/* Text overlay (theme color) */}
              <div className="absolute left-7 top-7">
                <div className="inline-block rounded-md bg-white/70 px-4 py-3 backdrop-blur-sm">
                  <div className="text-primary text-sm font-semibold tracking-wide">
                    {cat.title}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 text-primary text-sm font-medium underline underline-offset-4">
                    <span>{cat.cta}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle hover */}
              <div className="absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100 bg-black/5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


