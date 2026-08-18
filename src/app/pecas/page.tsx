import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "peças - cacali",
  description: "cada peça e única. quando você comprar, essa especifica some.",
};

export default async function PecasPage() {
  const products = await getProducts();

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-marrom">
            cada peça e única.
          </h1>
          <p className="text-marrom/50 mt-4 max-w-lg mx-auto">
            quando você comprar essa, ela some do site. não tem outra — nunca
            teve.
          </p>
          <div className="mt-4 inline-block bg-bege/50 px-4 py-2 rounded-full">
            <p className="text-xs text-marrom/60">
              a foto e a peça exata que você recebe.
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-6">
            <p className="font-display text-3xl font-light text-marrom/60 italic">
              as peças estão no forno.
            </p>
            <p className="text-marrom/40 max-w-md mx-auto">
              a cacali produz em pequenos lotes. quando acaba, fica vazia até a
              próxima fornada.
            </p>
            <Link
              href="/lista"
              className="inline-flex items-center justify-center bg-marrom text-creme px-8 py-3.5 text-sm tracking-wide hover:bg-pink transition-colors rounded-full"
            >
              quero saber quando volta
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
