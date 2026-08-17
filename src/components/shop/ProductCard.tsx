"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }}
    >
      <Link
        href={`/pecas/${product.slug}`}
        className="group block bg-white rounded-2xl border border-marrom/5 overflow-hidden hover:border-pink/20 hover:shadow-xl hover:shadow-pink/5 transition-all duration-300"
      >
        <div className="aspect-square bg-bege/20 overflow-hidden relative">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-bege/30">
              <span className="text-marrom/15 text-3xl font-bold">cacali</span>
            </div>
          )}
          {product.sold && (
            <div className="absolute inset-0 bg-marrom/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                essa já foi.
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-marrom group-hover:text-pink transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-marrom/50 mt-1">{product.hook}</p>
          <p className="text-sm font-bold text-marrom mt-3">
            {product.sold
              ? "vendida"
              : `R$ ${product.price.toFixed(2).replace(".", ",")}`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
