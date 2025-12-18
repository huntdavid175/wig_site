import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/cart/CartProvider";
import { ToastProvider } from "./components/toast/ToastProvider";
import AnnouncementBar from "./components/AnnouncementBar";
import Footer from "./components/Footer";
import Header from "./components/Header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "TER'RE Hair & Makeup",
  description: "Premium wigs, bundles, closures and frontals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} antialiased font-sans`}>
        <ToastProvider>
          <CartProvider>
            <div className="min-h-screen bg-white flex flex-col">
              <AnnouncementBar />
              <div className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
                <Header />
              </div>
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
