"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

interface SiteText {
  key: string;
  label: string;
  value: string;
  type: "text" | "textarea";
}

const defaultTexts: SiteText[] = [
  { key: "hero_title", label: "Hero — título", value: "sim, é uma xícara", type: "text" },
  { key: "hero_highlight", label: "Hero — destaque", value: "superfaturada.", type: "text" },
  { key: "hero_subtitle", label: "Hero — subtítulo", value: "e você vai querer assim mesmo.", type: "text" },
  { key: "hero_cta", label: "Hero — botão", value: "ver as peças", type: "text" },
  { key: "marquee_phrases", label: "Frases do marquee (separar com |)", value: "feita pra acompanhar aquela reunião que claramente podia ser um e-mail|pra quem tem bom gosto|pra quando o céu ficar daquele azul e você precisar de uma xícara que combine|peça única|pra quem usa o tiktok de google e aprendeu a romantizar a vida|cerâmica artesanal|pra presentear alguém que merece algo melhor que uma vela genérica|não tem no shein", type: "textarea" },
  { key: "closing_title", label: "Frase de fechamento — título", value: "imperfeição é assinatura.", type: "text" },
  { key: "closing_subtitle", label: "Frase de fechamento — subtítulo", value: "se fosse igual, não era cacali.", type: "text" },
  { key: "footer_phrase", label: "Footer — frase grande", value: "feito com mãos. sentido com alma.", type: "text" },
  { key: "about_text", label: "Footer — texto sobre", value: "Somos uma marca autoral de cerâmica artesanal feita à mão por Bárbara Kanigoski. Cada peça é única — como quem a recebe.", type: "textarea" },
];

export function SiteTextsManager() {
  const [texts, setTexts] = useState<SiteText[]>(defaultTexts);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadTexts();
  }, []);

  async function loadTexts() {
    try {
      const { supabase } = await import("@/lib/supabase");
      const { data } = await supabase.from("site_config").select("*");
      if (data) {
        setTexts(
          defaultTexts.map((t) => {
            const found = data.find((d: { key: string; value: string }) => d.key === t.key);
            return found ? { ...t, value: found.value } : t;
          })
        );
      }
    } catch {
      // not configured
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const { supabase } = await import("@/lib/supabase");
      for (const t of texts) {
        await supabase
          .from("site_config")
          .upsert({ key: t.key, value: t.value });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Erro: " + (err instanceof Error ? err.message : ""));
    } finally {
      setSaving(false);
    }
  }

  function updateText(key: string, value: string) {
    setTexts(texts.map((t) => (t.key === key ? { ...t, value } : t)));
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-marrom/50">
        edite os textos que aparecem no site. as mudanças só aparecem depois de
        recarregar a página.
      </p>

      {texts.map((t) => (
        <div key={t.key}>
          <label className="text-sm text-marrom/60 block mb-2">{t.label}</label>
          {t.type === "textarea" ? (
            <textarea
              rows={3}
              value={t.value}
              onChange={(e) => updateText(t.key, e.target.value)}
              className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 resize-none"
            />
          ) : (
            <input
              type="text"
              value={t.value}
              onChange={(e) => updateText(t.key, e.target.value)}
              className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50"
            />
          )}
        </div>
      ))}

      {saved && (
        <p className="text-sm text-marrom bg-bege rounded-xl px-4 py-3">
          textos salvos!
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 bg-marrom text-creme px-8 py-3 text-sm font-semibold rounded-full hover:bg-pink transition-colors disabled:opacity-50"
      >
        <Save size={16} />
        {saving ? "salvando..." : "salvar textos"}
      </button>
    </div>
  );
}
