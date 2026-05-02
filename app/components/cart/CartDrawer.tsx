"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useCart } from "./CartProvider";

function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CartDrawer() {
  const router = useRouter();
  const {
    isOpen,
    closeCart,
    items,
    itemCount,
    removeItem,
    setQty,
    clear,
  } = useCart();

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  // Focus close button on open (basic accessibility)
  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
  }, [isOpen]);

  // Prevent background scroll while drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY || 0;
    const body = document.body;
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
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={closeCart}
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close cart"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <div className="flex flex-col">
              <div className="text-lg font-semibold text-neutral-900">Cart</div>
              <div className="text-xs text-neutral-500">
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </div>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeCart}
              className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-5">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600">
                Your cart is empty.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((i) => (
                  <div
                    key={i.id}
                    className="rounded-2xl border border-neutral-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                          <Image
                            src={i.imageUrl || "/images/pony_2.jpg"}
                            alt={i.name}
                            fill
                            className="object-cover object-center"
                            sizes="56px"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="text-sm font-medium text-neutral-900 truncate">
                            {i.name}
                          </div>
                          {i.variant ? (
                            <div className="mt-1 text-xs text-neutral-500 truncate">
                              {i.variant}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(i.id)}
                        className="shrink-0 rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
                        aria-label={`Remove ${i.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white">
                        <button
                          type="button"
                          onClick={() => setQty(i.id, Math.max(1, i.qty - 1))}
                          className="rounded-full p-2 text-neutral-700 hover:bg-neutral-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <div className="min-w-10 text-center text-sm font-medium text-neutral-900">
                          {i.qty}
                        </div>
                        <button
                          type="button"
                          onClick={() => setQty(i.id, i.qty + 1)}
                          className="rounded-full p-2 text-neutral-700 hover:bg-neutral-50"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-sm font-semibold text-primary">
                        {money(i.price * i.qty)}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={clear}
                  className="self-start text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-4"
                >
                  Clear cart
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-100 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-semibold text-neutral-900">
                {money(subtotal)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                closeCart();
                router.push("/checkout");
              }}
              className="mt-4 w-full rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors disabled:opacity-60"
              disabled={items.length === 0}
            >
              Checkout
            </button>
            <button
              type="button"
              onClick={closeCart}
              className="mt-3 w-full rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}


