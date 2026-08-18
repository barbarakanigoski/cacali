"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { AdminSidebar, type SectionField } from "@/components/admin/AdminSidebar";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-config";

const keys = [
  "footer_phrase", "about_text", "footer_bg", "footer_text_color",
  "footer_phrase_color", "footer_phrase_size", "footer_btn_bg", "footer_btn_color",
];

const defaults: Record<string, string> = {
  footer_phrase: "feito com mãos. sentido com alma.",
  about_text: "Somos uma marca autoral de cerâmica artesanal feita à mão por Bárbara Kanigoski. Cada peça é única — como quem a recebe.",
  footer_bg: "#E1C3A6",
  footer_text_color: "#5A1B09",
  footer_phrase_color: "#E63B6F",
  footer_phrase_size: "5",
  footer_btn_bg: "#5A1B09",
  footer_btn_color: "#FFF8F2",
};

export function Footer() {
  const [t, setT] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    getSiteTexts(keys).then((data) => setT({ ...defaults, ...data }));
  }, []);

  const v = preview || t;

  function buildFields(): SectionField[] {
    return [
      { key: "footer_phrase", label: "Frase grande", value: v.footer_phrase, type: "text", group: "texto" },
      { key: "about_text", label: "Texto sobre", value: v.about_text, type: "textarea", group: "texto" },
      { key: "footer_bg", label: "Cor de fundo", value: v.footer_bg, type: "color", group: "cor" },
      { key: "footer_text_color", label: "Cor do texto", value: v.footer_text_color, type: "color", group: "cor" },
      { key: "footer_phrase_color", label: "Cor da frase grande", value: v.footer_phrase_color, type: "color", group: "cor" },
      { key: "footer_btn_bg", label: "Cor fundo botão", value: v.footer_btn_bg, type: "color", group: "cor" },
      { key: "footer_btn_color", label: "Cor texto botão", value: v.footer_btn_color, type: "color", group: "cor" },
      { key: "footer_phrase_size", label: "Tamanho da frase (vw)", value: v.footer_phrase_size, type: "range", group: "tipografia", min: 2, max: 10, unit: "vw" },
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
    <footer className="relative" style={{ backgroundColor: v.footer_bg, color: v.footer_text_color }}>
      <AdminEditButton onClick={() => setEditing(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 lg:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-10 lg:gap-x-16 gap-y-8 sm:gap-y-10">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-5">Sobre</h3>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: `${v.footer_text_color}b3` }}>
              {v.about_text}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5">Produtos</h3>
            <div className="flex flex-col gap-3 text-sm" style={{ color: `${v.footer_text_color}b3` }}>
              <Link href="/" className="hover:opacity-100 transition-opacity opacity-70">Home</Link>
              <Link href="/pecas" className="hover:opacity-100 transition-opacity opacity-70">Peças</Link>
              <Link href="/sobre" className="hover:opacity-100 transition-opacity opacity-70">Sobre</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5">Dúvidas</h3>
            <div className="flex flex-col gap-3 text-sm" style={{ color: `${v.footer_text_color}b3` }}>
              <Link href="/contato" className="hover:opacity-100 transition-opacity opacity-70">Trocas e devoluções</Link>
              <Link href="/contato" className="hover:opacity-100 transition-opacity opacity-70">Entrega e prazos</Link>
              <Link href="/contato" className="hover:opacity-100 transition-opacity opacity-70">Suporte</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5">Suporte</h3>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold rounded-full hover:opacity-90 transition-opacity w-full"
              style={{ backgroundColor: v.footer_btn_bg, color: v.footer_btn_color }}
            >
              Contato
            </Link>
          </div>
        </div>

        <div className="mt-10 sm:mt-16 mb-8 overflow-hidden">
          <p className="font-bold leading-none tracking-tighter text-center select-none" style={{ fontSize: `clamp(24px, ${v.footer_phrase_size}vw, 80px)`, color: v.footer_phrase_color }}>
            {v.footer_phrase}
          </p>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: `${v.footer_text_color}1a` }}>
          <p className="text-xs" style={{ color: `${v.footer_text_color}66` }}>
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/cacali.ceramica" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" aria-label="Instagram">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://tiktok.com/@cacali.ceramica" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" aria-label="TikTok">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-3.59-1.44V6.69h3.59z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {editing && (
        <AdminSidebar title="editar footer" fields={buildFields()} onSave={handleSave} onPreview={handlePreview} onClose={() => { setEditing(false); setPreview(null); }} />
      )}
    </footer>
  );
}
