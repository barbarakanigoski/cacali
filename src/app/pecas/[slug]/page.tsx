import { getProduct, getProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./AddToCartButton";
import { ProductGallery } from "./ProductGallery";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage(props: PageProps<"/pecas/[slug]">) {
  const { slug } = await props.params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          <ProductGallery
            mainImage={product.image_url}
            images={product.images}
            name={product.name}
          />

          <div className="md:sticky md:top-28 md:self-start space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-marrom tracking-tight">
              {product.name}
            </h1>
            <p className="text-marrom/60">{product.hook}</p>

            <div className="text-marrom/80 leading-relaxed whitespace-pre-line text-sm">
              {product.description}
            </div>

            <div className="text-sm text-marrom/50 space-y-1">
              <p>{product.material}</p>
              <p>{product.dimensions}</p>
            </div>

            <div className="bg-bege/30 rounded-xl p-4 space-y-2">
              <p className="text-xs text-marrom/60">
                peça única — esta foto é esta peça.
              </p>
              {product.extras && (
                <p className="text-xs text-marrom/60">{product.extras}</p>
              )}
            </div>

            {product.sold ? (
              <div className="space-y-4">
                <p className="text-2xl font-bold text-marrom/40">
                  essa já foi.
                </p>
                <p className="text-sm text-marrom/40">
                  encontrou alguém. não tinha outra igual — e não vai ter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-3xl font-bold text-marrom">
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
