import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "pecas - cacali",
  description: "cada peca e unica. quando voce comprar, essa especifica some.",
};

export default async function PecasPage() {
  const products = await getProducts();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-light text-burgundy">
            cada peca e unica.
          </h1>
          <p className="text-burgundy/50 mt-4 max-w-lg mx-auto">
            quando voce comprar essa, ela some do site. nao tem outra — nunca
            teve.
          </p>
          <div className="mt-4 inline-block bg-peonia/50 px-4 py-2 rounded-full">
            <p className="text-xs text-burgundy/60">
              a foto e a peca exata que voce recebe.
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-6">
            <p className="font-display text-3xl font-light text-burgundy/60 italic">
              as pecas estao no forno.
            </p>
            <p className="text-burgundy/40 max-w-md mx-auto">
              a cacali produz em pequenos lotes. quando acaba, fica vazia ate a
              proxima fornada.
            </p>
            <Link
              href="/lista"
              className="inline-flex items-center justify-center bg-burgundy text-creme px-8 py-3.5 text-sm tracking-wide hover:bg-fucsia transition-colors rounded-full"
            >
              quero saber quando volta
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
