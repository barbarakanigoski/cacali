"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/stores/cart";
import { CartDrawer } from "@/components/shop/CartDrawer";

export function Header() {
  const toggleCart = useCart((s) => s.toggleCart);
  const count = useCart((s) => s.count);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-creme/90 backdrop-blur-md border-b border-burgundy/5">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl font-light tracking-wide text-burgundy hover:text-fucsia transition-colors"
          >
            cacali
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/pecas"
              className="text-sm font-body text-burgundy/70 hover:text-burgundy transition-colors"
            >
              pecas
            </Link>
            <Link
              href="/sobre"
              className="text-sm font-body text-burgundy/70 hover:text-burgundy transition-colors"
            >
              sobre
            </Link>
            <a
              href="https://instagram.com/cacali.ceramica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body text-burgundy/70 hover:text-burgundy transition-colors"
            >
              instagram
            </a>
            <button
              onClick={toggleCart}
              className="relative text-burgundy/70 hover:text-burgundy transition-colors"
              aria-label="abrir sacola"
            >
              <ShoppingBag size={20} />
              {count() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-fucsia text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {count()}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>
      <CartDrawer />
    </>
  );
}
