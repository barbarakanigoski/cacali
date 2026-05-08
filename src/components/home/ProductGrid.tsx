import type { Product } from "@/types";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-light text-burgundy">
            as pecas
          </h2>
          <p className="text-burgundy/50 mt-4 max-w-lg mx-auto">
            cada uma e unica. quando voce comprar, essa exata some. nunca teve
            outra igual.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <p className="font-display text-2xl font-light text-burgundy/60 italic">
              as pecas estao no forno.
            </p>
            <p className="text-burgundy/40 text-sm max-w-sm mx-auto">
              a cacali produz em pequenos lotes. quando acaba, fica vazia ate a
              proxima fornada.
            </p>
            <Link
              href="/lista"
              className="inline-flex items-center justify-center border border-burgundy/20 text-burgundy px-8 py-3.5 text-sm tracking-wide hover:border-burgundy/40 transition-colors rounded-full mt-4"
            >
              entrar na lista
            </Link>
          </div>
        )}

        {products.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/pecas"
              className="inline-flex items-center justify-center border border-burgundy/20 text-burgundy px-8 py-3.5 text-sm tracking-wide hover:border-burgundy/40 transition-colors rounded-full"
            >
              ver todas as pecas
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
