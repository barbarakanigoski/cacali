"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/home/Hero";
import { Identification } from "@/components/home/Identification";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { ProductGrid } from "@/components/home/ProductGrid";
import { MiniAbout } from "@/components/home/MiniAbout";
import { InstagramSection } from "@/components/home/InstagramSection";
import { ClosingPhrase } from "@/components/home/ClosingPhrase";
import { PageBuilder } from "@/components/admin/PageBuilder";
import type { Product } from "@/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product | null>(null);

  useEffect(() => {
    async function load() {
      const { getProducts, getFeaturedProduct } = await import("@/lib/products");
      const [prods, feat] = await Promise.all([
        getProducts(),
        getFeaturedProduct(),
      ]);
      setProducts(prods);
      setFeatured(feat);
    }
    load();
  }, []);

  const gridProducts = products.filter((p) => !p.featured).slice(0, 6);

  const sections: Record<string, React.ReactNode> = {
    hero: <Hero />,
    identification: <Identification />,
    featured: <FeaturedProduct product={featured} />,
    grid: <ProductGrid products={gridProducts} />,
    about: <MiniAbout />,
    instagram: <InstagramSection />,
    closing: <ClosingPhrase />,
  };

  return <PageBuilder sections={sections} />;
}
