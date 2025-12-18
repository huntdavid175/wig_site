"use client";

import { BadgeCheck, Clock3, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type ValueProp = {
  title: string;
  icon: React.ReactNode;
};

const valueProps: ValueProp[] = [
  { title: "Fast Shipping", icon: <Truck size={22} /> },
  { title: "On-Time Delivery", icon: <Clock3 size={22} /> },
  { title: "Low Price Guarantee", icon: <BadgeCheck size={22} /> },
  { title: "Quality Guarantee", icon: <ShieldCheck size={22} /> },
];

export default function BrandValueSection() {
  const [shouldAutoplay, setShouldAutoplay] = useState(true);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const saveData =
      typeof navigator !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).connection?.saveData === true;
    if (prefersReducedMotion || saveData) setShouldAutoplay(false);
  }, []);

  return (
    <section className="bg-white">
      {/* Media banner */}
      <div className="relative w-full h-[340px] sm:h-[420px] overflow-hidden">
        {shouldAutoplay ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/hair_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hair_hero.jpg"
          />
        ) : (
          <Image
            src="/images/hair_hero.jpg"
            alt="Brand highlight"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        {/* overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

        {/* copy */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-8 sm:pb-10">
            <div className="max-w-xl rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 sm:p-6">
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Whether you&apos;re visiting our salon for a fresh cut, styling session,
                or exploring our collection of premium wigs and hair products, our
                transparent and fair pricing makes it easy to enjoy the look you
                desire. We regularly update our offerings to stay on trend while
                keeping services and products affordable for all clients.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Value props bar */}
      <div className="bg-[#0f1416]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((p, idx) => (
              <div
                key={p.title}
                className={`flex items-center gap-3 py-7 text-white/90 ${
                  idx > 0 ? "lg:border-l lg:border-white/10" : ""
                } ${idx % 2 === 1 ? "sm:border-l sm:border-white/10 lg:border-l" : ""}`}
              >
                <div className="text-primary">{p.icon}</div>
                <div className="text-sm font-medium tracking-wide">{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


