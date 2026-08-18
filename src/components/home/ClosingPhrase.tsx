"use client";

import { useState, useEffect } from "react";
import { AnimateOnScroll } from "@/components/animations/AnimateOnScroll";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { AdminSidebar, type SectionField } from "@/components/admin/AdminSidebar";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-config";

const keys = [
  "closing_title", "closing_subtitle", "closing_bg_image",
  "closing_title_size", "closing_title_color",
  "closing_subtitle_size", "closing_subtitle_color", "closing_padding",
];

const defaults: Record<string, string> = {
  closing_title: "imperfeição é assinatura.",
  closing_subtitle: "se fosse igual, não era cacali.",
  closing_bg_image: "/pattern-closing.png",
  closing_title_size: "64",
  closing_title_color: "#FFFFFF",
  closing_subtitle_size: "24",
  closing_subtitle_color: "#FFFFFFcc",
  closing_padding: "96",
};

export function ClosingPhrase() {
  const [t, setT] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    getSiteTexts(keys).then((data) => setT({ ...defaults, ...data }));
  }, []);

  const v = preview || t;

  function buildFields(): SectionField[] {
    return [
      { key: "closing_title", label: "Título", value: v.closing_title, type: "text", group: "texto" },
      { key: "closing_subtitle", label: "Subtítulo", value: v.closing_subtitle, type: "text", group: "texto" },
      { key: "closing_title_color", label: "Cor do título", value: v.closing_title_color, type: "color", group: "cor" },
      { key: "closing_subtitle_color", label: "Cor do subtítulo", value: v.closing_subtitle_color, type: "color", group: "cor" },
      { key: "closing_title_size", label: "Tamanho do título", value: v.closing_title_size, type: "range", group: "tipografia", min: 24, max: 96, unit: "px" },
      { key: "closing_subtitle_size", label: "Tamanho do subtítulo", value: v.closing_subtitle_size, type: "range", group: "tipografia", min: 14, max: 48, unit: "px" },
      { key: "closing_bg_image", label: "Imagem de fundo", value: v.closing_bg_image, type: "image", group: "imagem" },
      { key: "closing_padding", label: "Espaçamento vertical", value: v.closing_padding, type: "range", group: "layout", min: 40, max: 200, unit: "px" },
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
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${v.closing_bg_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: `clamp(48px, 10vw, ${v.closing_padding}px)`,
        paddingBottom: `clamp(48px, 10vw, ${v.closing_padding}px)`,
      }}
    >
      <AdminEditButton onClick={() => setEditing(true)} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimateOnScroll animation="blur" duration={1}>
          <p className="font-bold tracking-tight leading-tight drop-shadow-lg" style={{ fontSize: `clamp(28px, 7vw, ${v.closing_title_size}px)`, color: v.closing_title_color }}>
            {v.closing_title}
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fadeUp" delay={0.3}>
          <p className="font-medium mt-4 sm:mt-6 drop-shadow-md" style={{ fontSize: `clamp(14px, 3.5vw, ${v.closing_subtitle_size}px)`, color: v.closing_subtitle_color }}>
            {v.closing_subtitle}
          </p>
        </AnimateOnScroll>
      </div>

      {editing && (
        <AdminSidebar title="editar frase de fechamento" fields={buildFields()} onSave={handleSave} onPreview={handlePreview} onClose={() => { setEditing(false); setPreview(null); }} />
      )}
    </section>
  );
}
