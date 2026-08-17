"use client";

import { useState, useEffect } from "react";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { AdminSidebar, type SectionField } from "@/components/admin/AdminSidebar";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-config";

const keys = ["marquee_phrases", "marquee_bg", "marquee_text_color", "marquee_dot_color", "marquee_speed", "marquee_font_size"];

const defaults: Record<string, string> = {
  marquee_phrases: "**feita pra acompanhar aquela reunião que claramente podia ser um e-mail**|pra quem tem bom gosto|**pra quando o céu ficar daquele azul e você precisar de uma xícara que combine**|peça única|**pra quem usa o tiktok de google e aprendeu a romantizar a vida**|cerâmica artesanal|**pra presentear alguém que merece algo melhor que uma vela genérica**|não tem no shein",
  marquee_bg: "#E1C3A6",
  marquee_text_color: "#5A1B09",
  marquee_dot_color: "#E63B6F",
  marquee_speed: "40",
  marquee_font_size: "16",
};

export function Identification() {
  const [t, setT] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    getSiteTexts(keys).then((data) => setT({ ...defaults, ...data }));
  }, []);

  const v = preview || t;
  const phrases = v.marquee_phrases.split("|").map((raw) => {
    const trimmed = raw.trim();
    const isBold = trimmed.startsWith("**") && trimmed.endsWith("**");
    return { text: isBold ? trimmed.slice(2, -2) : trimmed, bold: isBold };
  });
  const repeated = [...phrases, ...phrases];

  function buildFields(): SectionField[] {
    return [
      { key: "marquee_phrases", label: "Frases do marquee", value: v.marquee_phrases, type: "phraseList", group: "texto" },
      { key: "marquee_bg", label: "Cor de fundo", value: v.marquee_bg, type: "color", group: "cor" },
      { key: "marquee_text_color", label: "Cor do texto", value: v.marquee_text_color, type: "color", group: "cor" },
      { key: "marquee_dot_color", label: "Cor dos pontos", value: v.marquee_dot_color, type: "color", group: "cor" },
      { key: "marquee_font_size", label: "Tamanho da fonte", value: v.marquee_font_size, type: "range", group: "tipografia", min: 10, max: 32, unit: "px" },
      { key: "marquee_speed", label: "Velocidade (segundos)", value: v.marquee_speed, type: "range", group: "layout", min: 10, max: 100, unit: "s" },
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
    <section className="relative py-5 overflow-hidden" style={{ backgroundColor: v.marquee_bg }}>
      <AdminEditButton onClick={() => setEditing(true)} />

      <div className="relative flex">
        <div className="flex whitespace-nowrap" style={{ animation: `marquee ${v.marquee_speed}s linear infinite` }}>
          {repeated.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className={`px-8 ${item.bold ? "font-bold" : "font-normal"}`} style={{ fontSize: `${v.marquee_font_size}px`, color: v.marquee_text_color }}>
                {item.text}
              </span>
              <span style={{ color: v.marquee_dot_color, fontSize: "8px" }}>&#9679;</span>
            </span>
          ))}
        </div>
        <div className="flex whitespace-nowrap absolute top-0" style={{ animation: `marquee2 ${v.marquee_speed}s linear infinite` }}>
          {repeated.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className={`px-8 ${item.bold ? "font-bold" : "font-normal"}`} style={{ fontSize: `${v.marquee_font_size}px`, color: v.marquee_text_color }}>
                {item.text}
              </span>
              <span style={{ color: v.marquee_dot_color, fontSize: "8px" }}>&#9679;</span>
            </span>
          ))}
        </div>
      </div>

      {editing && (
        <AdminSidebar title="editar marquee" fields={buildFields()} onSave={handleSave} onPreview={handlePreview} onClose={() => { setEditing(false); setPreview(null); }} />
      )}
    </section>
  );
}
