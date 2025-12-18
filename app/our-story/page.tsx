import Link from "next/link";
import { BadgeCheck, HeartHandshake, Leaf, ShieldCheck } from "lucide-react";

const values = [
  {
    title: "Premium Quality",
    desc: "We obsess over softness, longevity, and seamless blends—because luxury should feel effortless.",
    icon: <ShieldCheck size={22} className="text-primary" />,
  },
  {
    title: "Fair & Transparent",
    desc: "Clear pricing, honest sourcing, and no surprises—just confidence from checkout to install.",
    icon: <BadgeCheck size={22} className="text-primary" />,
  },
  {
    title: "Client-First",
    desc: "Your experience matters. We’re here for guidance, fit, and styling support at every step.",
    icon: <HeartHandshake size={22} className="text-primary" />,
  },
  {
    title: "Responsible Choices",
    desc: "Thoughtful selection and durable products that stay beautiful—wear after wear.",
    icon: <Leaf size={22} className="text-primary" />,
  },
];

const timeline = [
  { year: "2019", title: "The beginning", desc: "A small studio and a big vision for premium, accessible hair." },
  { year: "2021", title: "Community growth", desc: "We expanded textures and improved lace quality based on real feedback." },
  { year: "2023", title: "Quality first", desc: "Stronger QC, better packaging, and faster fulfillment—without compromise." },
  { year: "Today", title: "Built for confidence", desc: "A curated collection designed for everyday wear and statement looks." },
];

export default function OurStoryPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[420px] sm:h-[520px]">
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
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-10 sm:pb-12">
              <div className="max-w-2xl">
                <p className="text-white/80 text-sm tracking-widest uppercase">
                  Our Story
                </p>
                <h1
                  className="mt-3 text-white text-4xl sm:text-5xl md:text-6xl italic leading-tight"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Premium hair, made personal.
                </h1>
                <p className="mt-4 text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">
                  We created a modern hair destination built on quality, transparency,
                  and a flawless finish—so you can show up confidently every day.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
                  >
                    Shop collection
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white hover:bg-white/15 transition"
                  >
                    Back home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story + Stats */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <h2
                className="text-3xl sm:text-4xl text-primary italic leading-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Crafted for everyday luxury.
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Whether you’re looking for a seamless glueless install, a protective
                style that lasts, or a statement look that turns heads—our products
                are selected for softness, longevity, and natural movement.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                We source and curate with intention, refine based on community feedback,
                and obsess over details like lace quality, density, and finishing—so you
                get a premium experience from unboxing to wear.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-semibold text-primary">10k+</div>
                    <div className="mt-1 text-sm text-neutral-600">Happy clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-primary">48h</div>
                    <div className="mt-1 text-sm text-neutral-600">Fast dispatch</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-primary">5★</div>
                    <div className="mt-1 text-sm text-neutral-600">Avg. reviews</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-primary">QC</div>
                    <div className="mt-1 text-sm text-neutral-600">Quality checked</div>
                  </div>
                </div>
                <div className="mt-6 h-px bg-neutral-100" />
                <p className="mt-5 text-sm text-neutral-600 leading-relaxed">
                  Our goal is simple: make premium hair feel easy—natural blend,
                  secure fit, and confidence that lasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-8">
            <div className="max-w-2xl">
              <h2
                className="text-3xl sm:text-4xl text-primary italic leading-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                What we stand for
              </h2>
              <p className="mt-3 text-neutral-600 leading-relaxed">
                Modern beauty is about confidence, comfort, and choices you feel good about.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    {v.icon}
                  </div>
                  <div className="mt-4 text-sm font-semibold text-neutral-900">
                    {v.title}
                  </div>
                  <div className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {v.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-8">
            <div className="max-w-2xl">
              <h2
                className="text-3xl sm:text-4xl text-primary italic leading-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Our journey
              </h2>
              <p className="mt-3 text-neutral-600 leading-relaxed">
                Built step-by-step with community feedback and a focus on lasting quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {timeline.map((t) => (
                <div
                  key={t.year}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-semibold tracking-widest uppercase text-primary">
                      {t.year}
                    </div>
                    <div className="h-px flex-1 bg-neutral-100" />
                  </div>
                  <div className="mt-4 text-base font-semibold text-neutral-900">
                    {t.title}
                  </div>
                  <div className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {t.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <div className="text-sm font-semibold text-neutral-900">
                    Ready to find your perfect match?
                  </div>
                  <div className="mt-2 text-sm text-neutral-600">
                    Explore the collection and discover textures made for you.
                  </div>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


