"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import { AnimateOnScroll } from "@/components/animations/AnimateOnScroll";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { AdminSidebar, type SectionField } from "@/components/admin/AdminSidebar";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-config";

const keys = [
  "featured_badge", "featured_btn", "featured_bg",
  "featured_badge_color", "featured_badge_bg",
  "featured_title_size", "featured_title_color",
  "featured_hook_color", "featured_price_color",
  "featured_btn_bg", "featured_btn_color", "featured_padding",
];

const defaults: Record<string, string> = {
  featured_badge: "o diamante da temporada!",
  featured_btn: "quero essa",
  featured_bg: "#FFFFFF",
  featured_badge_color: "#E63B6F",
  featured_badge_bg: "#E63B6F15",
  featured_title_size: "48",
  featured_title_color: "#5A1B09",
  featured_hook_color: "#5A1B0999",
  featured_price_color: "#5A1B09",
  featured_btn_bg: "#5A1B09",
  featured_btn_color: "#FFFFFF",
  featured_padding: "96",
};

export function FeaturedProduct({ product }: { product: Product | null }) {
  const [t, setT] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    getSiteTexts(keys).then((data) => setT({ ...defaults, ...data }));
  }, []);

  const v = preview || t;

  if (!product) return null;

  function buildFields(): SectionField[] {
    return [
      { key: "featured_badge", label: "Texto da badge", value: v.featured_badge, type: "text", group: "texto" },
      { key: "featured_btn", label: "Texto do botão", value: v.featured_btn, type: "text", group: "texto" },
      { key: "featured_bg", label: "Cor de fundo", value: v.featured_bg, type: "color", group: "cor" },
      { key: "featured_badge_color", label: "Cor da badge", value: v.featured_badge_color, type: "color", group: "cor" },
      { key: "featured_badge_bg", label: "Fundo da badge", value: v.featured_badge_bg, type: "color", group: "cor" },
      { key: "featured_title_color", label: "Cor do título", value: v.featured_title_color, type: "color", group: "cor" },
      { key: "featured_hook_color", label: "Cor da descrição", value: v.featured_hook_color, type: "color", group: "cor" },
      { key: "featured_price_color", label: "Cor do preço", value: v.featured_price_color, type: "color", group: "cor" },
      { key: "featured_btn_bg", label: "Cor fundo botão", value: v.featured_btn_bg, type: "color", group: "cor" },
      { key: "featured_btn_color", label: "Cor texto botão", value: v.featured_btn_color, type: "color", group: "cor" },
      { key: "featured_title_size", label: "Tamanho do título", value: v.featured_title_size, type: "range", group: "tipografia", min: 24, max: 72, unit: "px" },
      { key: "featured_padding", label: "Espaçamento vertical", value: v.featured_padding, type: "range", group: "layout", min: 40, max: 200, unit: "px" },
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
    <section className="relative" style={{ backgroundColor: v.featured_bg, paddingTop: `${v.featured_padding}px`, paddingBottom: `${v.featured_padding}px` }}>
      <AdminEditButton onClick={() => setEditing(true)} />

      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll animation="fadeUp">
          <span
            className="inline-block text-xs tracking-widest uppercase font-bold mb-4 px-3 py-1.5 rounded-full"
            style={{ color: v.featured_badge_color, backgroundColor: v.featured_badge_bg }}
          >
            {v.featured_badge}
          </span>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mt-6">
          <AnimateOnScroll animation="fadeLeft" delay={0.1}>
            <div className="aspect-square bg-bege/30 rounded-3xl overflow-hidden group">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full" style={{ backgroundImage: "url(/pattern-pink-flowers.png)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
              )}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeRight" delay={0.2}>
            <div className="space-y-6">
              <h2
                className="font-bold tracking-tight leading-tight"
                style={{ fontSize: `${v.featured_title_size}px`, color: v.featured_title_color }}
              >
                {product.name}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: v.featured_hook_color }}>
                {product.hook}
              </p>
              <p className="text-3xl font-bold" style={{ color: v.featured_price_color }}>
                R$ {product.price.toFixed(2).replace(".", ",")}
              </p>
              <Link
                href={`/pecas/${product.slug}`}
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide hover:scale-105 transition-all duration-300 rounded-full"
                style={{ backgroundColor: v.featured_btn_bg, color: v.featured_btn_color }}
              >
                {v.featured_btn}
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {editing && (
        <AdminSidebar
          title="editar produto destaque"
          fields={buildFields()}
          onSave={handleSave}
          onPreview={handlePreview}
          onClose={() => { setEditing(false); setPreview(null); }}
        />
      )}
    </section>
  );
}
