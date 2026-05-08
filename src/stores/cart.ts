"use client";

import { create } from "zustand";
import type { Product, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleCart: () => void;
  closeCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product) => {
    const items = get().items;
    const existing = items.find((i) => i.product.id === product.id);
    if (existing) return;
    set({ items: [...items, { product, quantity: 1 }] });
  },
  removeItem: (productId) => {
    set({ items: get().items.filter((i) => i.product.id !== productId) });
  },
  toggleCart: () => set({ isOpen: !get().isOpen }),
  closeCart: () => set({ isOpen: false }),
  total: () => get().items.reduce((sum, i) => sum + i.product.price, 0),
  count: () => get().items.length,
}));
