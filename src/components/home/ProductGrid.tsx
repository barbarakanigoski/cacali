"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/animations/AnimateOnScroll";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { AdminSidebar, type SectionField } from "@/components/admin/AdminSidebar";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-config";

const keys = [
  "grid_title", "grid_subtitle", "grid_empty_title", "grid_empty_subtitle",
  "grid_btn_text", "grid_bg", "grid_title_color", "grid_subtitle_color",
  "grid_title_size", "grid_padding",
];

const defaults: Record<string, string> = {
  grid_title: "as peças",
  grid_subtitle: "cada uma é única. quando você comprar, essa exata some. nunca teve outra igual.",
  grid_empty_title: "as peças estão no forno.",
  grid_empty_subtitle: "a cacali produz em pequenos lotes. quando acaba, fica vazia até a próxima fornada.",
  grid_btn_text: "ver todas as peças",
  grid_bg: "#FFF8F2",
  grid_title_color: "#5A1B09",
  grid_subtitle_color: "#5A1B0980",
  grid_title_size: "48",
  grid_padding: "96",
};

export function ProductGrid({ products }: { products: Product[] }) {
  const [t, setT] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    getSiteTexts(keys).then((data) => setT({ ...defaults, ...data }));
  }, []);

  const v = preview || t;

  function buildFields(): SectionField[] {
    return [
      { key: "grid_title", label: "Título", value: v.grid_title, type: "text", group: "texto" },
      { key: "grid_subtitle", label: "Subtítulo", value: v.grid_subtitle, type: "textarea", group: "texto" },
      { key: "grid_empty_title", label: "Título (sem produtos)", value: v.grid_empty_title, type: "text", group: "texto" },
      { key: "grid_empty_subtitle", label: "Subtítulo (sem produtos)", value: v.grid_empty_subtitle, type: "textarea", group: "texto" },
      { key: "grid_btn_text", label: "Texto do botão", value: v.grid_btn_text, type: "text", group: "texto" },
      { key: "grid_bg", label: "Cor de fundo", value: v.grid_bg, type: "color", group: "cor" },
      { key: "grid_title_color", label: "Cor do título", value: v.grid_title_color, type: "color", group: "cor" },
      { key: "grid_subtitle_color", label: "Cor do subtítulo", value: v.grid_subtitle_color, type: "color", group: "cor" },
      { key: "grid_title_size", label: "Tamanho do título", value: v.grid_title_size, type: "range", group: "tipografia", min: 24, max: 72, unit: "px" },
      { key: "grid_padding", label: "Espaçamento vertical", value: v.grid_padding, type: "range", group: "layout", min: 40, max: 200, unit: "px" },
    ];
  }

  async function handleSave(fields: SectionField[]) {
    const updated: Record<string, string> = {};
    for (const f of fields) updated[f.key] = f.value;
    await saveSiteTexts(updated);
    setT({ ...t, ...updated });
    setPreview(null);
  }

  function handlePreview(fields: SectionField[]) {
    const p: Record<string, string> = {};
    for (const f of fields) p[f.key] = f.value;
    setPreview({ ...t, ...p });
  }

  return (
    <section className="relative" style={{ backgroundColor: v.grid_bg, paddingTop: `clamp(48px, 10vw, ${v.grid_padding}px)`, paddingBottom: `clamp(48px, 10vw, ${v.grid_padding}px)` }}>
      <AdminEditButton onClick={() => setEditing(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimateOnScroll animation="fadeUp" className="text-center mb-16">
          <h2 className="font-bold tracking-tight" style={{ fontSize: `clamp(28px, 6vw, ${v.grid_title_size}px)`, color: v.grid_title_color }}>
            {v.grid_title}
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-lg" style={{ color: v.grid_subtitle_color }}>
            {v.grid_subtitle}
          </p>
        </AnimateOnScroll>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {products.map((product, i) => (
              <AnimateOnScroll key={product.id} animation="fadeUp" delay={i * 0.1}>
                <ProductCard product={product} />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4 bg-white rounded-3xl border border-marrom/5 p-12">
            <p className="text-2xl font-semibold text-marrom/60">{v.grid_empty_title}</p>
            <p className="text-marrom/40 text-sm max-w-sm mx-auto">{v.grid_empty_subtitle}</p>
            <Link href="/lista" className="inline-flex items-center justify-center bg-pink text-white px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-pink/90 hover:scale-105 transition-all duration-300 rounded-full mt-4">
              entrar na lista
            </Link>
          </div>
        )}

        {products.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/pecas" className="inline-flex items-center justify-center border-2 border-marrom/10 text-marrom px-8 py-3.5 text-sm font-semibold tracking-wide hover:border-marrom/30 hover:bg-marrom/5 transition-all duration-300 rounded-full">
              {v.grid_btn_text}
            </Link>
          </div>
        )}
      </div>

      {editing && (
        <AdminSidebar title="editar grid de peças" fields={buildFields()} onSave={handleSave} onPreview={handlePreview} onClose={() => { setEditing(false); setPreview(null); }} />
      )}
    </section>
  );
}
