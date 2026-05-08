import Link from "next/link";
import type { Product } from "@/types";

export function FeaturedProduct({ product }: { product: Product | null }) {
  if (!product) return null;

  return (
    <section className="py-24 md:py-32 bg-creme">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 aspect-[4/3] bg-peonia/30 rounded-3xl overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-burgundy/10 text-6xl">
                  cacali
                </span>
              </div>
            )}
          </div>
          <div className="md:col-span-2 space-y-6">
            <span className="text-xs tracking-widest uppercase text-fucsia font-medium">
              tem uma peca nova
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-burgundy">
              {product.name}
            </h2>
            <p className="text-burgundy/60 leading-relaxed">{product.hook}</p>
            <p className="font-display text-2xl text-burgundy">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
            <Link
              href={`/pecas/${product.slug}`}
              className="inline-flex items-center justify-center bg-burgundy text-creme px-8 py-3.5 text-sm tracking-wide hover:bg-fucsia transition-colors rounded-full"
            >
              quero essa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
