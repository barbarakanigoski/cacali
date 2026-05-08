"use client";

import Link from "next/link";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/pecas/${product.slug}`} className="group block">
      <div className="aspect-square bg-peonia/30 rounded-2xl overflow-hidden mb-4 relative">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-burgundy/20 text-4xl">
              cacali
            </span>
          </div>
        )}
        {product.sold && (
          <div className="absolute inset-0 bg-burgundy/60 flex items-center justify-center">
            <span className="text-creme font-display text-lg italic">
              essa ja foi.
            </span>
          </div>
        )}
      </div>
      <h3 className="font-display text-lg text-burgundy group-hover:text-fucsia transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-burgundy/50 mt-1">{product.hook}</p>
      <p className="text-sm font-medium text-burgundy mt-2">
        {product.sold
          ? "vendida"
          : `R$ ${product.price.toFixed(2).replace(".", ",")}`}
      </p>
    </Link>
  );
}
