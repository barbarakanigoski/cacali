"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/types";
import { Trash2, Plus, Save } from "lucide-react";

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const { supabase } = await import("@/lib/supabase");
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setProducts(data);
    } catch {
      // supabase not configured
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(product: Product) {
    try {
      const { supabase } = await import("@/lib/supabase");
      const { id, created_at, ...fields } = product;

      if (id && products.find((p) => p.id === id)) {
        await supabase.from("products").update(fields).eq("id", id);
      } else {
        await supabase.from("products").insert(fields);
      }
      await loadProducts();
      setEditing(null);
    } catch (err) {
      alert("Erro ao salvar: " + (err instanceof Error ? err.message : ""));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("tem certeza que quer excluir essa peça?")) return;
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("products").delete().eq("id", id);
      await loadProducts();
    } catch {
      alert("erro ao excluir.");
    }
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image_url"
  ) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;

    try {
      const { supabase } = await import("@/lib/supabase");
      const path = `products/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("images")
        .upload(path, file);
      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(path);

      setEditing({ ...editing, [field]: publicUrl });
    } catch (err) {
      alert("Erro no upload: " + (err instanceof Error ? err.message : ""));
    }
  }

  function newProduct(): Product {
    return {
      id: "",
      slug: "",
      name: "",
      hook: "",
      description: "",
      material: "",
      dimensions: "",
      price: 0,
      image_url: "",
      images: [],
      extras: null,
      sold: false,
      featured: false,
      created_at: "",
    };
  }

  if (loading) return <p className="text-marrom/50 text-sm">carregando...</p>;

  if (editing) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-marrom">
            {editing.id ? "editar peça" : "nova peça"}
          </h2>
          <button
            onClick={() => setEditing(null)}
            className="text-sm text-marrom/50 hover:text-marrom"
          >
            cancelar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="nome"
            value={editing.name}
            onChange={(v) => setEditing({ ...editing, name: v })}
          />
          <Field
            label="slug (url)"
            value={editing.slug}
            onChange={(v) => setEditing({ ...editing, slug: v })}
          />
          <Field
            label="gancho"
            value={editing.hook}
            onChange={(v) => setEditing({ ...editing, hook: v })}
          />
          <Field
            label="preço (R$)"
            value={String(editing.price)}
            onChange={(v) =>
              setEditing({ ...editing, price: parseFloat(v) || 0 })
            }
          />
          <Field
            label="material"
            value={editing.material}
            onChange={(v) => setEditing({ ...editing, material: v })}
          />
          <Field
            label="dimensões"
            value={editing.dimensions}
            onChange={(v) => setEditing({ ...editing, dimensions: v })}
          />
        </div>

        <div>
          <label className="text-sm text-marrom/60 block mb-2">descrição</label>
          <textarea
            rows={5}
            value={editing.description}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
            className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 resize-none"
          />
        </div>

        <Field
          label="extras (stickers, etc)"
          value={editing.extras || ""}
          onChange={(v) => setEditing({ ...editing, extras: v || null })}
        />

        <div>
          <label className="text-sm text-marrom/60 block mb-2">
            imagem principal
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "image_url")}
            className="text-sm text-marrom/60"
          />
          {editing.image_url && (
            <img
              src={editing.image_url}
              alt=""
              className="mt-2 h-32 rounded-xl object-cover"
            />
          )}
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-marrom/70">
            <input
              type="checkbox"
              checked={editing.featured}
              onChange={(e) =>
                setEditing({ ...editing, featured: e.target.checked })
              }
              className="rounded"
            />
            destaque na home
          </label>
          <label className="flex items-center gap-2 text-sm text-marrom/70">
            <input
              type="checkbox"
              checked={editing.sold}
              onChange={(e) =>
                setEditing({ ...editing, sold: e.target.checked })
              }
              className="rounded"
            />
            vendida
          </label>
        </div>

        <button
          onClick={() => handleSave(editing)}
          className="inline-flex items-center gap-2 bg-marrom text-creme px-8 py-3 text-sm font-semibold rounded-full hover:bg-pink transition-colors"
        >
          <Save size={16} />
          salvar peça
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setEditing(newProduct())}
        className="inline-flex items-center gap-2 bg-pink text-white px-6 py-3 text-sm font-semibold rounded-full hover:bg-pink/90 transition-colors mb-6"
      >
        <Plus size={16} />
        nova peça
      </button>

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-marrom/5 rounded-2xl p-4 flex items-center gap-4"
          >
            <div
              className="w-16 h-16 bg-bege/30 rounded-xl flex-shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: p.image_url
                  ? `url(${p.image_url})`
                  : undefined,
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-marrom text-sm truncate">
                {p.name}
              </p>
              <p className="text-xs text-marrom/50">
                R$ {p.price.toFixed(2).replace(".", ",")}
                {p.sold && " · vendida"}
                {p.featured && " · destaque"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(p)}
                className="text-xs text-marrom/60 hover:text-pink bg-bege/50 px-3 py-1.5 rounded-full transition-colors"
              >
                editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-marrom/30 hover:text-pink transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-marrom/40 text-sm text-center py-8">
            nenhum produto cadastrado.
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
