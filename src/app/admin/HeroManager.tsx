"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";

interface HeroSlide {
  id: string;
  title: string;
  highlight: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  bg_image: string;
  order: number;
}

export function HeroManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [loading, setLoading] = useState(true);
  const [useCarousel, setUseCarousel] = useState(false);

  useEffect(() => {
    loadSlides();
  }, []);

  async function loadSlides() {
    try {
      const { supabase } = await import("@/lib/supabase");
      const { data: config } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "hero_carousel")
        .single();
      if (config) setUseCarousel(config.value === "true");

      const { data } = await supabase
        .from("hero_slides")
        .select("*")
        .order("order", { ascending: true });
      if (data) setSlides(data);
    } catch {
      // not configured
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(slide: HeroSlide) {
    try {
      const { supabase } = await import("@/lib/supabase");
      const { id, ...fields } = slide;

      if (id && slides.find((s) => s.id === id)) {
        await supabase.from("hero_slides").update(fields).eq("id", id);
      } else {
        await supabase
          .from("hero_slides")
          .insert({ ...fields, order: slides.length });
      }
      await loadSlides();
      setEditing(null);
    } catch (err) {
      alert("Erro: " + (err instanceof Error ? err.message : ""));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("excluir esse slide?")) return;
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("hero_slides").delete().eq("id", id);
      await loadSlides();
    } catch {
      alert("erro ao excluir.");
    }
  }

  async function toggleCarousel() {
    const next = !useCarousel;
    setUseCarousel(next);
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase
        .from("site_config")
        .upsert({ key: "hero_carousel", value: String(next) });
    } catch {
      // ignore
    }
  }

  async function handleBgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    try {
      const { supabase } = await import("@/lib/supabase");
      const path = `hero/${Date.now()}-${file.name}`;
      await supabase.storage.from("images").upload(path, file);
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(path);
      setEditing({ ...editing, bg_image: publicUrl });
    } catch {
      alert("erro no upload.");
    }
  }

  function newSlide(): HeroSlide {
    return {
      id: "",
      title: "sim, é uma xícara",
      highlight: "superfaturada.",
      subtitle: "e você vai querer assim mesmo.",
      cta_text: "ver as peças",
      cta_link: "/pecas",
      bg_image: "",
      order: slides.length,
    };
  }

  if (loading) return <p className="text-marrom/50 text-sm">carregando...</p>;

  if (editing) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-marrom">editar slide</h2>
          <button
            onClick={() => setEditing(null)}
            className="text-sm text-marrom/50"
          >
            cancelar
          </button>
        </div>

        <Field
          label="título (linha 1)"
          value={editing.title}
          onChange={(v) => setEditing({ ...editing, title: v })}
        />
        <Field
          label="destaque (linha 2, cor diferente)"
          value={editing.highlight}
          onChange={(v) => setEditing({ ...editing, highlight: v })}
        />
        <Field
          label="subtítulo"
          value={editing.subtitle}
          onChange={(v) => setEditing({ ...editing, subtitle: v })}
        />
        <div className="grid grid-cols-2 gap-5">
          <Field
            label="texto do botão"
            value={editing.cta_text}
            onChange={(v) => setEditing({ ...editing, cta_text: v })}
          />
          <Field
            label="link do botão"
            value={editing.cta_link}
            onChange={(v) => setEditing({ ...editing, cta_link: v })}
          />
        </div>

        <div>
          <label className="text-sm text-marrom/60 block mb-2">
            imagem de fundo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBgUpload}
            className="text-sm text-marrom/60"
          />
          {editing.bg_image && (
            <img
              src={editing.bg_image}
              alt=""
              className="mt-2 h-32 rounded-xl object-cover"
            />
          )}
        </div>

        <button
          onClick={() => handleSave(editing)}
          className="inline-flex items-center gap-2 bg-marrom text-creme px-8 py-3 text-sm font-semibold rounded-full hover:bg-pink transition-colors"
        >
          <Save size={16} />
          salvar slide
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-3 text-sm text-marrom">
          <input
            type="checkbox"
            checked={useCarousel}
            onChange={toggleCarousel}
            className="rounded"
          />
          <span>
            ativar carrossel{" "}
            <span className="text-marrom/40">(desativado = só o primeiro slide)</span>
          </span>
        </label>

        <button
          onClick={() => setEditing(newSlide())}
          className="inline-flex items-center gap-2 bg-pink text-white px-6 py-2.5 text-sm font-semibold rounded-full hover:bg-pink/90 transition-colors"
        >
          <Plus size={16} />
          novo slide
        </button>
      </div>

      <div className="space-y-3">
        {slides.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-marrom/5 rounded-2xl p-4 flex items-center gap-4"
          >
            <GripVertical size={16} className="text-marrom/20" />
            <div
              className="w-24 h-14 bg-pink/20 rounded-xl flex-shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: s.bg_image ? `url(${s.bg_image})` : undefined,
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-marrom text-sm truncate">
                {s.title} <span className="text-pink">{s.highlight}</span>
              </p>
              <p className="text-xs text-marrom/50 truncate">{s.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(s)}
                className="text-xs text-marrom/60 hover:text-pink bg-bege/50 px-3 py-1.5 rounded-full"
              >
                editar
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="text-marrom/30 hover:text-pink"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {slides.length === 0 && (
          <p className="text-marrom/40 text-sm text-center py-8">
            nenhum slide cadastrado. o hero vai usar o conteúdo padrão.
          </p>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm text-marrom/60 block mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50"
      />
    </div>
  );
}
