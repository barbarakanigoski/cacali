"use client";

import { useState, useEffect } from "react";
import { AnimateOnScroll } from "@/components/animations/AnimateOnScroll";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { AdminSidebar, type SectionField } from "@/components/admin/AdminSidebar";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-config";

const keys = [
  "instagram_title", "instagram_subtitle", "instagram_handle",
  "instagram_bg", "instagram_title_color", "instagram_subtitle_color",
  "instagram_title_size", "instagram_btn_bg", "instagram_btn_color", "instagram_padding",
];

const defaults: Record<string, string> = {
  instagram_title: "quer ver como nasce?",
  instagram_subtitle: "a gente documenta tudo — a argila, o forno, os erros, e a cacau tentando participar no meio.",
  instagram_handle: "@cacali.ceramica",
  instagram_bg: "#FFFFFF",
  instagram_title_color: "#5A1B09",
  instagram_subtitle_color: "#5A1B0980",
  instagram_title_size: "48",
  instagram_btn_bg: "#5A1B09",
  instagram_btn_color: "#FFFFFF",
  instagram_padding: "96",
};

export function InstagramSection() {
  const [t, setT] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    getSiteTexts(keys).then((data) => setT({ ...defaults, ...data }));
  }, []);

  const v = preview || t;

  function buildFields(): SectionField[] {
    return [
      { key: "instagram_title", label: "Título", value: v.instagram_title, type: "text", group: "texto" },
      { key: "instagram_subtitle", label: "Subtítulo", value: v.instagram_subtitle, type: "textarea", group: "texto" },
      { key: "instagram_handle", label: "@ do Instagram", value: v.instagram_handle, type: "text", group: "texto" },
      { key: "instagram_bg", label: "Cor de fundo", value: v.instagram_bg, type: "color", group: "cor" },
      { key: "instagram_title_color", label: "Cor do título", value: v.instagram_title_color, type: "color", group: "cor" },
      { key: "instagram_subtitle_color", label: "Cor do subtítulo", value: v.instagram_subtitle_color, type: "color", group: "cor" },
      { key: "instagram_btn_bg", label: "Cor fundo botão", value: v.instagram_btn_bg, type: "color", group: "cor" },
      { key: "instagram_btn_color", label: "Cor texto botão", value: v.instagram_btn_color, type: "color", group: "cor" },
      { key: "instagram_title_size", label: "Tamanho do título", value: v.instagram_title_size, type: "range", group: "tipografia", min: 24, max: 72, unit: "px" },
      { key: "instagram_padding", label: "Espaçamento vertical", value: v.instagram_padding, type: "range", group: "layout", min: 40, max: 200, unit: "px" },
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
    <section className="relative" style={{ backgroundColor: v.instagram_bg, paddingTop: `clamp(48px, 10vw, ${v.instagram_padding}px)`, paddingBottom: `clamp(48px, 10vw, ${v.instagram_padding}px)` }}>
      <AdminEditButton onClick={() => setEditing(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <AnimateOnScroll animation="fadeUp">
          <h2 className="font-bold tracking-tight" style={{ fontSize: `clamp(28px, 6vw, ${v.instagram_title_size}px)`, color: v.instagram_title_color }}>
            {v.instagram_title}
          </h2>
          <p className="mt-4 text-lg" style={{ color: v.instagram_subtitle_color }}>
            {v.instagram_subtitle}
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[1, 2, 3, 4].map((i) => (
            <AnimateOnScroll key={i} animation="scaleUp" delay={i * 0.1}>
              <div className="aspect-square bg-bege/30 rounded-2xl flex items-center justify-center border border-marrom/5 hover:border-pink/20 hover:shadow-lg transition-all duration-300">
                <span className="text-marrom/15 text-sm font-semibold">instagram {i}</span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll animation="fadeUp" delay={0.5}>
          <a
            href={`https://instagram.com/${v.instagram_handle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-full hover:scale-105 transition-all duration-300 mt-10"
            style={{ backgroundColor: v.instagram_btn_bg, color: v.instagram_btn_color }}
          >
            {v.instagram_handle}
            <span className="ml-2">&rarr;</span>
          </a>
        </AnimateOnScroll>
      </div>

      {editing && (
        <AdminSidebar title="editar seção instagram" fields={buildFields()} onSave={handleSave} onPreview={handlePreview} onClose={() => { setEditing(false); setPreview(null); }} />
      )}
    </section>
  );
}
