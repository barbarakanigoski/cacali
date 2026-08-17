"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

export interface EditField {
  key: string;
  label: string;
  value: string;
  type?: "text" | "textarea";
}

interface Props {
  title: string;
  fields: EditField[];
  onSave: (fields: EditField[]) => Promise<void>;
  onClose: () => void;
}

export function InlineEditModal({ title, fields: initial, onSave, onClose }: Props) {
  const [fields, setFields] = useState<EditField[]>(initial);
  const [saving, setSaving] = useState(false);

  function update(key: string, value: string) {
    setFields(fields.map((f) => (f.key === key ? { ...f, value } : f)));
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-creme rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-marrom/40 hover:text-marrom transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-marrom mb-6">{title}</h2>

        <div className="space-y-5">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-sm text-marrom/60 block mb-2">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={f.value}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={f.value}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50"
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 inline-flex items-center gap-2 bg-marrom text-creme px-8 py-3 text-sm font-semibold rounded-full hover:bg-pink transition-colors disabled:opacity-50 w-full justify-center"
        >
          <Save size={16} />
          {saving ? "salvando..." : "salvar"}
        </button>
      </div>
    </div>
  );
}
