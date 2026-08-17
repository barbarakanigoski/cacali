"use client";

import { useCart } from "@/stores/cart";
import type { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items, toggleCart } = useCart();
  const inCart = items.some((i) => i.product.id === product.id);

  function handleClick() {
    if (inCart) {
      toggleCart();
    } else {
      addItem(product);
      toggleCart();
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-marrom text-creme py-4 text-sm tracking-wide hover:bg-pink transition-colors rounded-full"
    >
      {inCart ? "ver sacola" : "adicionar a sacola"}
    </button>
  );
}
