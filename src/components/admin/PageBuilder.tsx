"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/stores/auth";
import { GripVertical, Eye, EyeOff, Trash2, Plus, Pencil, Save, Undo2 } from "lucide-react";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-config";

const ADMIN_EMAILS = ["babikanigoski@gmail.com"];

export interface SectionBlock {
  id: string;
  type: string;
  label: string;
  visible: boolean;
}

const defaultLayout: SectionBlock[] = [
  { id: "hero", type: "hero", label: "Hero", visible: true },
  { id: "marquee", type: "identification", label: "Marquee", visible: true },
  { id: "featured", type: "featured", label: "Produto Destaque", visible: true },
  { id: "grid", type: "grid", label: "Grid de Peças", visible: true },
  { id: "about", type: "about", label: "Mini Sobre", visible: true },
  { id: "instagram", type: "instagram", label: "Instagram", visible: true },
  { id: "closing", type: "closing", label: "Frase de Fechamento", visible: true },
];

const availableSections = [
  { type: "hero", label: "Hero" },
  { type: "identification", label: "Marquee" },
  { type: "featured", label: "Produto Destaque" },
  { type: "grid", label: "Grid de Peças" },
  { type: "about", label: "Mini Sobre" },
  { type: "instagram", label: "Instagram" },
  { type: "closing", label: "Frase de Fechamento" },
];

interface Props {
  sections: Record<string, React.ReactNode>;
  onEditSection?: (type: string) => void;
}

export function PageBuilder({ sections }: Props) {
  const { user } = useAuth();
  const isAdmin = user && ADMIN_EMAILS.includes(user.email || "");
  const [layout, setLayout] = useState<SectionBlock[]>(defaultLayout);
  const [editMode, setEditMode] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const initialLayout = useRef<SectionBlock[]>(defaultLayout);

  useEffect(() => {
    getSiteTexts(["page_layout"]).then((data) => {
      if (data.page_layout) {
        try {
          const parsed = JSON.parse(data.page_layout);
          setLayout(parsed);
          initialLayout.current = parsed;
        } catch { /* use default */ }
      }
    });
  }, []);

  async function saveLayout(newLayout: SectionBlock[]) {
    setSaving(true);
    try {
      await saveSiteTexts({ page_layout: JSON.stringify(newLayout) });
      initialLayout.current = newLayout;
      setHasChanges(false);
    } catch {
      alert("erro ao salvar layout.");
    } finally {
      setSaving(false);
    }
  }

  function updateLayout(newLayout: SectionBlock[]) {
    setLayout(newLayout);
    setHasChanges(true);
  }

  function toggleVisibility(index: number) {
    const updated = [...layout];
    updated[index] = { ...updated[index], visible: !updated[index].visible };
    updateLayout(updated);
  }

  function removeSection(index: number) {
    updateLayout(layout.filter((_, i) => i !== index));
  }

  function addSection(type: string, atIndex: number) {
    const template = availableSections.find((s) => s.type === type);
    if (!template) return;
    const newBlock: SectionBlock = {
      id: `${type}-${Date.now()}`,
      type,
      label: template.label,
      visible: true,
    };
    const updated = [...layout];
    updated.splice(atIndex, 0, newBlock);
    updateLayout(updated);
    setShowAddMenu(null);
  }

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    setDragOverIndex(index);
  }

  function handleDrop(index: number) {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const updated = [...layout];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    updateLayout(updated);
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function handleUndo() {
    setLayout(initialLayout.current);
    setHasChanges(false);
  }

  // Non-admin: render sections in order
  if (!isAdmin) {
    return (
      <>
        {layout.filter((s) => s.visible).map((s) => (
          <div key={s.id}>{sections[s.type]}</div>
        ))}
      </>
    );
  }

  return (
    <>
      {/* Admin toolbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-2 bg-marrom text-creme px-4 py-2.5 rounded-full shadow-2xl shadow-black/30 border border-white/10">
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            editMode ? "bg-pink text-white" : "bg-white/10 hover:bg-white/20"
          }`}
        >
          <Pencil size={14} />
          {editMode ? "editando" : "editar página"}
        </button>

        {hasChanges && (
          <>
            <button
              onClick={handleUndo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Undo2 size={14} />
              desfazer
            </button>
            <button
              onClick={() => saveLayout(layout)}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-pink hover:bg-pink/80 transition-colors disabled:opacity-50"
            >
              <Save size={14} />
              {saving ? "salvando..." : "salvar layout"}
            </button>
          </>
        )}
      </div>

      {/* Sections */}
      {layout.map((block, index) => (
        <div key={block.id}>
          {/* Add section button between blocks */}
          {editMode && (
            <div className="relative">
              <div className="flex items-center justify-center py-1 group">
                <div className="flex-1 border-t border-dashed border-pink/30" />
                <button
                  onClick={() => setShowAddMenu(showAddMenu === index ? null : index)}
                  className="mx-3 w-7 h-7 rounded-full bg-pink/10 text-pink hover:bg-pink hover:text-white flex items-center justify-center transition-all opacity-40 group-hover:opacity-100"
                >
                  <Plus size={14} />
                </button>
                <div className="flex-1 border-t border-dashed border-pink/30" />
              </div>

              {showAddMenu === index && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full z-[80] bg-white rounded-2xl shadow-2xl border border-marrom/10 p-3 min-w-[220px]">
                  <p className="text-xs text-marrom/40 font-semibold mb-2 px-2">adicionar seção</p>
                  {availableSections.map((s) => (
                    <button
                      key={s.type}
                      onClick={() => addSection(s.type, index)}
                      className="w-full text-left px-3 py-2 text-sm text-marrom hover:bg-bege/50 rounded-lg transition-colors"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Section block */}
          <div
            className={`relative transition-all ${
              editMode ? "ring-1 ring-inset" : ""
            } ${
              !block.visible && editMode ? "opacity-30" : ""
            } ${
              dragOverIndex === index && dragIndex !== index ? "ring-pink ring-2" : "ring-transparent"
            }`}
            draggable={editMode}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
          >
            {/* Section admin bar */}
            {editMode && (
              <div className="absolute top-0 left-0 right-0 z-[60] flex items-center gap-2 px-4 py-2 bg-marrom/90 backdrop-blur-sm text-white">
                <GripVertical size={16} className="cursor-grab opacity-50 hover:opacity-100" />
                <span className="text-xs font-semibold flex-1">{block.label}</span>

                <button
                  onClick={() => toggleVisibility(index)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  title={block.visible ? "esconder" : "mostrar"}
                >
                  {block.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button
                  onClick={() => removeSection(index)}
                  className="p-1.5 rounded-lg hover:bg-pink/50 transition-colors"
                  title="remover seção"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}

            {/* Render section content */}
            {(block.visible || editMode) && sections[block.type]}
          </div>
        </div>
      ))}

      {/* Add section at the end */}
      {editMode && (
        <div className="relative">
          <div className="flex items-center justify-center py-1 group">
            <div className="flex-1 border-t border-dashed border-pink/30" />
            <button
              onClick={() => setShowAddMenu(showAddMenu === layout.length ? null : layout.length)}
              className="mx-3 w-7 h-7 rounded-full bg-pink/10 text-pink hover:bg-pink hover:text-white flex items-center justify-center transition-all opacity-40 group-hover:opacity-100"
            >
              <Plus size={14} />
            </button>
            <div className="flex-1 border-t border-dashed border-pink/30" />
          </div>

          {showAddMenu === layout.length && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full z-[80] bg-white rounded-2xl shadow-2xl border border-marrom/10 p-3 min-w-[220px]">
              <p className="text-xs text-marrom/40 font-semibold mb-2 px-2">adicionar seção</p>
              {availableSections.map((s) => (
                <button
                  key={s.type}
                  onClick={() => addSection(s.type, layout.length)}
                  className="w-full text-left px-3 py-2 text-sm text-marrom hover:bg-bege/50 rounded-lg transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
