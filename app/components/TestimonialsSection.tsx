"use client";

import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating: number;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Amina K.",
    location: "London, UK",
    rating: 5,
    initials: "AK",
    quote:
      "The hair quality is unreal—soft, full, and blends perfectly. Install was effortless and it still looks brand new weeks later.",
  },
  {
    name: "Jade M.",
    location: "Dubai, UAE",
    rating: 5,
    initials: "JM",
    quote:
      "Fast shipping and the lace melts like a dream. I’m obsessed with the finish—super natural and truly premium.",
  },
  {
    name: "Nora S.",
    location: "Toronto, CA",
    rating: 5,
    initials: "NS",
    quote:
      "Best purchase this year. The curls hold definition, minimal shedding, and the packaging felt luxurious. Highly recommend.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-primary text-primary" : "text-neutral-300"}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
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
                Loved by clients
              </h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Real reviews from customers who wear our hair every day—premium feel,
                flawless finishes, and confidence that lasts.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <Stars rating={t.rating} />

                <blockquote className="mt-5 text-[15px] leading-relaxed text-neutral-800">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-neutral-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-neutral-500">{t.location}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


