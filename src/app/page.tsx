import { Hero } from "@/components/home/Hero";
import { Identification } from "@/components/home/Identification";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { ProductGrid } from "@/components/home/ProductGrid";
import { MiniAbout } from "@/components/home/MiniAbout";
import { InstagramSection } from "@/components/home/InstagramSection";
import { ClosingPhrase } from "@/components/home/ClosingPhrase";
import { getProducts, getFeaturedProduct } from "@/lib/products";

export default async function Home() {
  const [products, featured] = await Promise.all([
    getProducts(),
    getFeaturedProduct(),
  ]);

  const gridProducts = products.filter((p) => !p.featured).slice(0, 6);

  return (
    <>
      <Hero />
      <Identification />
      <FeaturedProduct product={featured} />
      <ProductGrid products={gridProducts} />
      <MiniAbout />
      <InstagramSection />
      <ClosingPhrase />
    </>
  );
}
