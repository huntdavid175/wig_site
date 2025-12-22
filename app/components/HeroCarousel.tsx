"use client";

import Image from "next/image";

export default function HeroCarousel() {
  return (
    <section className="relative w-full">
      {/* Mobile Hero (match Our Story hero) */}
      <div className="md:hidden relative h-[420px] sm:h-[520px] overflow-hidden">
        {/*
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/hair_video1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hair_hero.jpg"
          />
        */}
        <Image
          src="/images/pony_1.jpg"
          alt="Hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/35 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-10 sm:pb-12">
            <div className="max-w-2xl">
              <p className="text-white/80 text-sm tracking-widest uppercase">
                Ponytail extensions
              </p>
              <h1
                className="mt-3 text-white text-4xl sm:text-5xl italic leading-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Your best ponytail, instantly
              </h1>
              <p className="mt-4 text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">
                Soft, natural-looking ponytail hair for effortless length and
                volume—wrap, clip, and go in minutes.
              </p>

              <button className="mt-7 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors">
                View Collection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Hero (keep current split look) */}
      <div className="hidden md:flex relative w-full min-h-[calc(100vh-140px)]">
        {/* Left Side - Content */}
        <div className="w-1/2 bg-[#f5f2e8] relative flex items-center py-20 pr-6 lg:pr-12 pl-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] lg:pl-[max(3rem,calc((100vw-1400px)/2+3rem))]">
          {/* Decorative Face Line Art */}
          <svg
            className="absolute bottom-8 left-4 w-32 h-48 text-[#c5c0b0] opacity-70"
            viewBox="0 0 120 180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Face profile outline */}
            <path d="M30 170 Q20 140 25 110 Q28 85 40 70 Q48 58 52 45 Q54 30 48 18 Q55 8 70 10 Q85 12 92 28 Q97 42 94 58 Q91 70 98 82 Q108 100 110 120 Q112 145 100 165" />
            {/* Eye hint */}
            <path d="M58 35 Q62 38 66 35" />
            {/* Nose line */}
            <path d="M70 50 L72 65" />
            {/* Lips hint */}
            <path d="M62 80 Q70 86 78 80" />
          </svg>

          {/* Content */}
          <div className="relative z-10 max-w-xl text-left">
            <h1
              className="text-5xl lg:text-6xl xl:text-7xl text-primary leading-[1.1] mb-8 italic font-normal"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Your best ponytail, instantly
            </h1>

            <p className="text-primary text-base leading-relaxed mb-10 max-w-sm">
              Soft, natural ponytail hair that blends beautifully—secure hold,
              smooth finish, and all-day confidence.
            </p>

            <button className="bg-primary hover:bg-primary-hover text-white px-14 py-4 text-sm font-medium tracking-wide transition-all duration-300">
              View Collection
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 relative bg-[#f5f2e8]">
          {/* Image container with curved RIGHT edge */}
          <div className="absolute inset-0 overflow-hidden rounded-r-[9999px]">
            {/*
              <video
                className="absolute inset-0 h-full w-full object-cover object-center"
                src="/videos/hair_video1.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/hair_hero.jpg"
              />
            */}
            <Image
              src="/images/pony_3.jpg"
              alt="Hero"
              fill
              priority
              className="object-cover object-top"
              sizes="50vw"
            />
            {/* subtle overlay to match the reference contrast */}
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
