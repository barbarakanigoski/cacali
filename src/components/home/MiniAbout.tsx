"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimateOnScroll } from "@/components/animations/AnimateOnScroll";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { AdminSidebar, type SectionField } from "@/components/admin/AdminSidebar";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-config";

const keys = [
  "about_badge", "about_title", "about_subtitle", "about_link_text",
  "about_bg", "about_title_color", "about_subtitle_color",
  "about_badge_color", "about_badge_bg", "about_title_size",
  "about_image", "about_padding",
];

const defaults: Record<string, string> = {
  about_badge: "a história",
  about_title: "toda cerâmica tem uma origem.",
  about_subtitle: "essa começa com ansiedade, argila é uma cachorra chamada cacau.",
  about_link_text: "conhecer a história",
  about_bg: "#E1C3A633",
  about_title_color: "#5A1B09",
  about_subtitle_color: "#5A1B0999",
  about_badge_color: "#E63B6F",
  about_badge_bg: "#E63B6F15",
  about_title_size: "36",
  about_image: "",
  about_padding: "96",
};

export function MiniAbout() {
  const [t, setT] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    getSiteTexts(keys).then((data) => setT({ ...defaults, ...data }));
  }, []);

  const v = preview || t;

  function buildFields(): SectionField[] {
    return [
      { key: "about_badge", label: "Badge", value: v.about_badge, type: "text", group: "texto" },
      { key: "about_title", label: "Título", value: v.about_title, type: "text", group: "texto" },
      { key: "about_subtitle", label: "Subtítulo", value: v.about_subtitle, type: "textarea", group: "texto" },
      { key: "about_link_text", label: "Texto do link", value: v.about_link_text, type: "text", group: "texto" },
      { key: "about_bg", label: "Cor de fundo", value: v.about_bg, type: "color", group: "cor" },
      { key: "about_title_color", label: "Cor do título", value: v.about_title_color, type: "color", group: "cor" },
      { key: "about_subtitle_color", label: "Cor do subtítulo", value: v.about_subtitle_color, type: "color", group: "cor" },
      { key: "about_badge_color", label: "Cor da badge", value: v.about_badge_color, type: "color", group: "cor" },
      { key: "about_badge_bg", label: "Fundo da badge", value: v.about_badge_bg, type: "color", group: "cor" },
      { key: "about_title_size", label: "Tamanho do título", value: v.about_title_size, type: "range", group: "tipografia", min: 20, max: 64, unit: "px" },
      { key: "about_image", label: "Foto (lateral)", value: v.about_image, type: "image", group: "imagem" },
      { key: "about_padding", label: "Espaçamento vertical", value: v.about_padding, type: "range", group: "layout", min: 40, max: 200, unit: "px" },
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
    <section className="relative" style={{ backgroundColor: v.about_bg, paddingTop: `clamp(48px, 10vw, ${v.about_padding}px)`, paddingBottom: `clamp(48px, 10vw, ${v.about_padding}px)` }}>
      <AdminEditButton onClick={() => setEditing(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <AnimateOnScroll animation="fadeLeft">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-bege/60 relative">
              {v.about_image ? (
                <img src={v.about_image} alt="cacali" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image src="/icon-cacau.png" alt="cacali" width={80} height={90} className="h-20 w-auto opacity-20" />
                </div>
              )}
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeRight" delay={0.15}>
            <div className="space-y-6">
              <span className="inline-block text-xs tracking-widest uppercase font-bold px-3 py-1.5 rounded-full" style={{ color: v.about_badge_color, backgroundColor: v.about_badge_bg }}>
                {v.about_badge}
              </span>
              <h2 className="font-bold tracking-tight leading-tight" style={{ fontSize: `clamp(24px, 5vw, ${v.about_title_size}px)`, color: v.about_title_color }}>
                {v.about_title}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: v.about_subtitle_color }}>
                {v.about_subtitle}
              </p>
              <Link href="/sobre" className="inline-flex items-center text-sm font-semibold hover:text-pink transition-colors group" style={{ color: v.about_title_color }}>
                {v.about_link_text}
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {editing && (
        <AdminSidebar title="editar mini sobre" fields={buildFields()} onSave={handleSave} onPreview={handlePreview} onClose={() => { setEditing(false); setPreview(null); }} />
      )}
    </section>
  );
}
