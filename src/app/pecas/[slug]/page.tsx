import { getProduct, getProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./AddToCartButton";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage(props: PageProps<"/pecas/[slug]">) {
  const { slug } = await props.params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-4">
            <div className="aspect-square bg-peonia/30 rounded-3xl overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-burgundy/15 text-6xl">
                    cacali
                  </span>
                </div>
              )}
            </div>
            {product.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-peonia/20 rounded-xl overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:sticky md:top-28 md:self-start space-y-6">
            <h1 className="font-display text-3xl md:text-4xl font-light text-burgundy">
              {product.name}
            </h1>
            <p className="text-burgundy/60">{product.hook}</p>

            <div className="text-burgundy/80 leading-relaxed whitespace-pre-line text-sm">
              {product.description}
            </div>

            <div className="text-sm text-burgundy/50 space-y-1">
              <p>{product.material}</p>
              <p>{product.dimensions}</p>
            </div>

            <div className="bg-peonia/30 rounded-xl p-4 space-y-2">
              <p className="text-xs text-burgundy/60">
                peca unica — esta foto e esta peca.
              </p>
              {product.extras && (
                <p className="text-xs text-burgundy/60">{product.extras}</p>
              )}
            </div>

            {product.sold ? (
              <div className="space-y-4">
                <p className="font-display text-2xl text-burgundy/40 italic">
                  essa ja foi.
                </p>
                <p className="text-sm text-burgundy/40">
                  encontrou alguem. nao tinha outra igual — e nao vai ter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-display text-3xl text-burgundy">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
                <AddToCartButton product={product} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
