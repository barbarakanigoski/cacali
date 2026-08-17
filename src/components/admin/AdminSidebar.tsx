"use client";

import { useState, useEffect, useRef } from "react";
import { X, Type, Palette, Image as ImageIcon, Box, Upload, RotateCcw, Bold, Plus, Trash2, GripVertical } from "lucide-react";

export interface SectionField {
  key: string;
  label: string;
  value: string;
  type: "text" | "textarea" | "color" | "select" | "image" | "range" | "phraseList";
  group: "texto" | "cor" | "tipografia" | "imagem" | "layout";
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  unit?: string;
}

interface Props {
  title: string;
  fields: SectionField[];
  onSave: (fields: SectionField[]) => Promise<void>;
  onClose: () => void;
  onPreview?: (fields: SectionField[]) => void;
}

const groupIcons = {
  texto: Type,
  cor: Palette,
  tipografia: Type,
  imagem: ImageIcon,
  layout: Box,
};

const groupLabels = {
  texto: "Textos",
  cor: "Cores",
  tipografia: "Tipografia",
  imagem: "Imagens",
  layout: "Layout",
};

export function AdminSidebar({ title, fields: initial, onSave, onClose, onPreview }: Props) {
  const [fields, setFields] = useState<SectionField[]>(initial);
  const [saving, setSaving] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const groups = [...new Set(fields.map((f) => f.group))];

  useEffect(() => {
    if (groups.length > 0 && !activeGroup) setActiveGroup(groups[0]);
  }, []);

  function update(key: string, value: string) {
    const updated = fields.map((f) => (f.key === key ? { ...f, value } : f));
    setFields(updated);
    onPreview?.(updated);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(fields);
      onClose();
    } catch {
      alert("erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  function handleReset(key: string) {
    const orig = initial.find((f) => f.key === key);
    if (orig) update(key, orig.value);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingKey(key);
    try {
      const { supabase } = await import("@/lib/supabase");
      const path = `site/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("images").upload(path, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(path);
      update(key, publicUrl);
    } catch {
      alert("erro no upload.");
    } finally {
      setUploadingKey(null);
    }
  }

  const filtered = fields.filter((f) => f.group === activeGroup);

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="w-[400px] bg-creme shadow-2xl flex flex-col h-full overflow-hidden border-l border-marrom/10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-marrom/10 bg-white">
          <h2 className="text-base font-bold text-marrom">{title}</h2>
          <button onClick={onClose} className="text-marrom/40 hover:text-marrom">
            <X size={20} />
          </button>
        </div>

        {/* Group Tabs */}
        <div className="flex gap-1 px-4 py-3 bg-white border-b border-marrom/10 overflow-x-auto">
          {groups.map((g) => {
            const Icon = groupIcons[g as keyof typeof groupIcons] || Box;
            return (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeGroup === g
                    ? "bg-marrom text-creme"
                    : "text-marrom/50 hover:text-marrom hover:bg-marrom/5"
                }`}
              >
                <Icon size={13} />
                {groupLabels[g as keyof typeof groupLabels] || g}
              </button>
            );
          })}
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {filtered.map((f) => (
            <div key={f.key}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-marrom/60">{f.label}</label>
                <button
                  onClick={() => handleReset(f.key)}
                  className="text-marrom/25 hover:text-marrom/60 transition-colors"
                  title="restaurar original"
                >
                  <RotateCcw size={12} />
                </button>
              </div>

              {f.type === "text" && (
                <input
                  type="text"
                  value={f.value}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full bg-white border border-marrom/10 rounded-lg px-3 py-2 text-marrom text-sm focus:outline-none focus:border-pink/50"
                />
              )}

              {f.type === "textarea" && (
                <textarea
                  rows={3}
                  value={f.value}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full bg-white border border-marrom/10 rounded-lg px-3 py-2 text-marrom text-sm focus:outline-none focus:border-pink/50 resize-none"
                />
              )}

              {f.type === "color" && (
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={f.value}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="w-10 h-10 rounded-lg border border-marrom/10 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={f.value}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="flex-1 bg-white border border-marrom/10 rounded-lg px-3 py-2 text-marrom text-sm font-mono focus:outline-none focus:border-pink/50"
                  />
                </div>
              )}

              {f.type === "select" && (
                <select
                  value={f.value}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full bg-white border border-marrom/10 rounded-lg px-3 py-2 text-marrom text-sm focus:outline-none focus:border-pink/50"
                >
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              )}

              {f.type === "range" && (
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={f.min ?? 0}
                    max={f.max ?? 100}
                    value={parseInt(f.value) || 0}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="flex-1 accent-pink"
                  />
                  <span className="text-xs text-marrom/60 font-mono w-16 text-right">
                    {f.value}{f.unit || "px"}
                  </span>
                </div>
              )}

              {f.type === "image" && (
                <div className="space-y-2">
                  {f.value && (
                    <div className="relative w-full h-24 bg-bege/30 rounded-lg overflow-hidden">
                      <img src={f.value} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setUploadingKey(f.key);
                      fileInputRef.current?.click();
                    }}
                    disabled={uploadingKey === f.key}
                    className="flex items-center gap-2 text-xs text-marrom/60 hover:text-pink bg-white border border-marrom/10 rounded-lg px-3 py-2 w-full transition-colors"
                  >
                    <Upload size={13} />
                    {uploadingKey === f.key ? "enviando..." : "trocar imagem"}
                  </button>
                  <input
                    type="text"
                    value={f.value}
                    onChange={(e) => update(f.key, e.target.value)}
                    placeholder="ou cole a URL da imagem"
                    className="w-full bg-white border border-marrom/10 rounded-lg px-3 py-2 text-marrom text-xs focus:outline-none focus:border-pink/50"
                  />
                </div>
              )}

              {f.type === "phraseList" && (
                <PhraseListEditor
                  value={f.value}
                  onChange={(v) => update(f.key, v)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-5 py-4 border-t border-marrom/10 bg-white space-y-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-marrom text-creme py-3 text-sm font-semibold rounded-full hover:bg-pink transition-colors disabled:opacity-50"
          >
            {saving ? "salvando..." : "salvar alterações"}
          </button>
          <button
            onClick={onClose}
            className="w-full text-marrom/50 py-2 text-xs hover:text-marrom transition-colors"
          >
            cancelar
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (uploadingKey) handleImageUpload(e, uploadingKey);
        }}
      />
    </div>
  );
}

// --- Phrase List Editor ---
// Format: **bold phrase**|regular phrase|**bold phrase**
function PhraseListEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  function parse(raw: string) {
    return raw.split("|").map((p) => {
      const trimmed = p.trim();
      const isBold = trimmed.startsWith("**") && trimmed.endsWith("**");
      return {
        text: isBold ? trimmed.slice(2, -2) : trimmed,
        bold: isBold,
      };
    });
  }

  function serialize(phrases: { text: string; bold: boolean }[]) {
    return phrases.map((p) => (p.bold ? `**${p.text}**` : p.text)).join("|");
  }

  const phrases = parse(value);

  function updatePhrase(index: number, text: string) {
    const updated = [...phrases];
    updated[index] = { ...updated[index], text };
    onChange(serialize(updated));
  }

  function toggleBold(index: number) {
    const updated = [...phrases];
    updated[index] = { ...updated[index], bold: !updated[index].bold };
    onChange(serialize(updated));
  }

  function addPhrase() {
    onChange(serialize([...phrases, { text: "nova frase", bold: false }]));
  }

  function removePhrase(index: number) {
    const updated = phrases.filter((_, i) => i !== index);
    onChange(serialize(updated));
  }

  function movePhrase(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= phrases.length) return;
    const updated = [...phrases];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(serialize(updated));
  }

  return (
    <div className="space-y-2">
      {phrases.map((p, i) => (
        <div key={i} className="flex items-center gap-1.5 group">
          <button
            onClick={() => movePhrase(i, -1)}
            className="text-marrom/20 hover:text-marrom/50 transition-colors cursor-grab"
            title="mover pra cima"
          >
            <GripVertical size={14} />
          </button>

          <button
            onClick={() => toggleBold(i)}
            className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${
              p.bold
                ? "bg-marrom text-creme"
                : "bg-white border border-marrom/10 text-marrom/30 hover:text-marrom/60"
            }`}
            title={p.bold ? "remover bold" : "tornar bold"}
          >
            <Bold size={13} />
          </button>

          <input
            type="text"
            value={p.text}
            onChange={(e) => updatePhrase(i, e.target.value)}
            className={`flex-1 bg-white border border-marrom/10 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-pink/50 ${
              p.bold ? "font-bold text-marrom" : "text-marrom/70"
            }`}
          />

          <button
            onClick={() => removePhrase(i)}
            className="text-marrom/15 hover:text-pink transition-colors opacity-0 group-hover:opacity-100"
            title="remover frase"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button
        onClick={addPhrase}
        className="flex items-center gap-1.5 text-xs text-marrom/40 hover:text-pink transition-colors mt-2"
      >
        <Plus size={13} />
        adicionar frase
      </button>
    </div>
  );
}
