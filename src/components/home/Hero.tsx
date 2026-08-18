"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { AdminSidebar, type SectionField } from "@/components/admin/AdminSidebar";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-config";

const keys = [
  "hero_title", "hero_highlight", "hero_subtitle", "hero_cta",
  "hero_bg_image", "hero_overlay_color", "hero_overlay_opacity",
  "hero_title_size", "hero_title_weight", "hero_title_color",
  "hero_highlight_color", "hero_subtitle_size", "hero_subtitle_color",
  "hero_cta_bg", "hero_cta_color", "hero_padding",
];

const defaults: Record<string, string> = {
  hero_title: "sim, é uma xícara",
  hero_highlight: "superfaturada.",
  hero_subtitle: "e você vai querer assim mesmo.",
  hero_cta: "ver as peças",
  hero_bg_image: "/pattern-hero.png",
  hero_overlay_color: "#5A1B09",
  hero_overlay_opacity: "40",
  hero_title_size: "80",
  hero_title_weight: "700",
  hero_title_color: "#FFFFFF",
  hero_highlight_color: "#E1C3A6",
  hero_subtitle_size: "28",
  hero_subtitle_color: "#FFFFFF",
  hero_cta_bg: "#E1C3A6",
  hero_cta_color: "#5A1B09",
  hero_padding: "112",
};

export function Hero() {
  const [t, setT] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    getSiteTexts(keys).then((data) => setT({ ...defaults, ...data }));
  }, []);

  const v = preview || t;

  function buildFields(): SectionField[] {
    return [
      { key: "hero_title", label: "Título (linha 1)", value: v.hero_title, type: "text", group: "texto" },
      { key: "hero_highlight", label: "Destaque (linha 2)", value: v.hero_highlight, type: "text", group: "texto" },
      { key: "hero_subtitle", label: "Subtítulo", value: v.hero_subtitle, type: "text", group: "texto" },
      { key: "hero_cta", label: "Texto do botão", value: v.hero_cta, type: "text", group: "texto" },
      { key: "hero_title_color", label: "Cor do título", value: v.hero_title_color, type: "color", group: "cor" },
      { key: "hero_highlight_color", label: "Cor do destaque", value: v.hero_highlight_color, type: "color", group: "cor" },
      { key: "hero_subtitle_color", label: "Cor do subtítulo", value: v.hero_subtitle_color, type: "color", group: "cor" },
      { key: "hero_overlay_color", label: "Cor do overlay", value: v.hero_overlay_color, type: "color", group: "cor" },
      { key: "hero_cta_bg", label: "Cor fundo botão", value: v.hero_cta_bg, type: "color", group: "cor" },
      { key: "hero_cta_color", label: "Cor texto botão", value: v.hero_cta_color, type: "color", group: "cor" },
      { key: "hero_title_size", label: "Tamanho do título", value: v.hero_title_size, type: "range", group: "tipografia", min: 32, max: 128, unit: "px" },
      { key: "hero_title_weight", label: "Peso do título", value: v.hero_title_weight, type: "select", group: "tipografia", options: [
        { label: "Light (300)", value: "300" }, { label: "Regular (400)", value: "400" },
        { label: "Medium (500)", value: "500" }, { label: "Semi-Bold (600)", value: "600" },
        { label: "Bold (700)", value: "700" },
      ]},
      { key: "hero_subtitle_size", label: "Tamanho do subtítulo", value: v.hero_subtitle_size, type: "range", group: "tipografia", min: 14, max: 48, unit: "px" },
      { key: "hero_bg_image", label: "Imagem de fundo", value: v.hero_bg_image, type: "image", group: "imagem" },
      { key: "hero_overlay_opacity", label: "Opacidade do overlay", value: v.hero_overlay_opacity, type: "range", group: "layout", min: 0, max: 100, unit: "%" },
      { key: "hero_padding", label: "Espaçamento vertical", value: v.hero_padding, type: "range", group: "layout", min: 40, max: 200, unit: "px" },
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
      className="relative flex items-center justify-center overflow-hidden pt-20"
      style={{ paddingTop: `clamp(60px, 12vw, ${parseInt(v.hero_padding)}px)`, paddingBottom: `clamp(40px, 10vw, ${parseInt(v.hero_padding) - 32}px)` }}
    >
      <AdminEditButton onClick={() => setEditing(true)} />

      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${v.hero_bg_image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: v.hero_overlay_color, opacity: parseInt(v.hero_overlay_opacity) / 100 }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image src="/icon-cacau.png" alt="" width={64} height={72} className="h-16 w-auto brightness-0 invert opacity-50" />
        </motion.div>

        <motion.h1
          className="leading-[1.05] tracking-tight drop-shadow-lg"
          style={{ fontSize: `clamp(32px, 8vw, ${v.hero_title_size}px)`, fontWeight: v.hero_title_weight, color: v.hero_title_color }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {v.hero_title}
          <br />
          <motion.span
            style={{ color: v.hero_highlight_color, display: "inline-block" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {v.hero_highlight}
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-4 sm:mt-6 max-w-lg mx-auto font-light drop-shadow-md"
          style={{ fontSize: `clamp(16px, 4vw, ${v.hero_subtitle_size}px)`, color: v.hero_subtitle_color }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {v.hero_subtitle}
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/pecas"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide hover:scale-105 transition-all duration-300 rounded-full shadow-lg shadow-black/15"
            style={{ backgroundColor: v.hero_cta_bg, color: v.hero_cta_color }}
          >
            {v.hero_cta}
          </Link>
        </motion.div>
      </div>

      {editing && (
        <AdminSidebar
          title="editar hero"
          fields={buildFields()}
          onSave={handleSave}
          onPreview={handlePreview}
          onClose={() => { setEditing(false); setPreview(null); }}
        />
      )}
    </section>
  );
}
