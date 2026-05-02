export default function CheckoutPage() {
  return (
    <section className="max-w-[1000px] mx-auto px-6 lg:px-12 py-12">
      <h1
        className="text-4xl sm:text-5xl text-primary italic"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Checkout
      </h1>
      <p className="mt-3 text-neutral-600">
        You are on the checkout page. Continue your purchase by filling in
        shipping and payment details.
      </p>
    </section>
  );
}
