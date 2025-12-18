"use client";

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

type Toast = {
  id: string;
  title: string;
  description?: string;
};

type ToastContextValue = {
  show: (toast: Omit<Toast, "id">, opts?: { durationMs?: number }) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function uid() {
  // good enough for UI notifications
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeouts = useRef<Record<string, number>>({});

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const handle = timeouts.current[id];
    if (handle) window.clearTimeout(handle);
    delete timeouts.current[id];
  }, []);

  const show: ToastContextValue["show"] = useCallback(
    (toast, opts) => {
      const id = uid();
      const durationMs = opts?.durationMs ?? 3200;
      setToasts((prev) => [{ id, ...toast }, ...prev].slice(0, 3));
      timeouts.current[id] = window.setTimeout(() => dismiss(id), durationMs);
    },
    [dismiss]
  );

  const value = useMemo<ToastContextValue>(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast viewport */}
      <div
        className="fixed z-[60] bottom-4 right-4 left-4 sm:left-auto sm:w-[380px] flex flex-col gap-3 pointer-events-none"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-md shadow-xl px-4 py-3"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-neutral-900">{t.title}</div>
                {t.description ? (
                  <div className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    {t.description}
                  </div>
                ) : null}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded-full p-2 text-neutral-700 hover:bg-neutral-100 transition"
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-neutral-200">
              <div className="h-full w-full origin-left animate-[toastbar_3.2s_linear_forwards] bg-primary" />
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}


