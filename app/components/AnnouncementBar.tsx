"use client";

export default function AnnouncementBar() {
  const message =
    "Core collection available now | get free shipping on orders over $200";

  return (
    <div className="bg-primary text-white py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {/* Repeat the message multiple times for seamless scrolling */}
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-16 text-sm font-light tracking-wide">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
