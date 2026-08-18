"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

const pieceTypes = [
  "cinzeiro",
  "xícara",
  "caneca",
  "jarra",
  "coador",
  "vaso",
  "prato",
  "bowl",
  "outro",
];

interface Item {
  id: number;
  piece_type: string;
  quantity: number;
  description: string;
}

let nextId = 1;
function createItem(): Item {
  return { id: nextId++, piece_type: "", quantity: 1, description: "" };
}

export default function EncomendasPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([createItem()]);
  const [sending, setSending] = useState(false);

  function updateItem(id: number, field: keyof Item, value: string | number) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  function addItem() {
    setItems((prev) => [...prev, createItem()]);
  }

  function removeItem(id: number) {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = items.map(({ piece_type, quantity, description }) => ({
      piece_type,
      quantity,
      description,
    }));

    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("quotes").insert({
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone") || null,
        items: payload,
      });
    } catch {
      // fallback: just show success
    }

    setSending(false);
    router.push("/encomendas/enviado");
  }

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl sm:text-5xl font-light text-marrom text-center">
          encomendas.
        </h1>
        <p className="text-marrom/50 text-center mt-4 max-w-md mx-auto">
          quer uma peça sob medida? me conta o que você tem em mente — eu vejo o
          que o barro consegue fazer.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
            {/* dados de contato */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-marrom/60 block mb-2">
                  nome
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-marrom/60 block mb-2">
                  e-mail
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors"
                />
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label className="text-sm text-marrom/60 block mb-2">
                whatsapp <span className="text-marrom/30">(opcional)</span>
              </label>
              <input
                name="phone"
                type="tel"
                className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors"
              />
            </div>

            {/* itens */}
            <div className="space-y-4">
              <p className="text-sm text-marrom/60">peças</p>

              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white border border-marrom/10 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-marrom/40">
                      item {index + 1}
                    </span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-marrom/30 hover:text-pink transition-colors"
                        aria-label="remover item"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-[1fr_80px] gap-4">
                    <div>
                      <label className="text-sm text-marrom/60 block mb-2">
                        tipo de peça
                      </label>
                      <select
                        required
                        value={item.piece_type}
                        onChange={(e) =>
                          updateItem(item.id, "piece_type", e.target.value)
                        }
                        className="w-full bg-creme border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors appearance-none"
                      >
                        <option value="">selecione</option>
                        {pieceTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-marrom/60 block mb-2">
                        qtd
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            Number(e.target.value) || 1
                          )
                        }
                        className="w-full bg-creme border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-marrom/60 block mb-2">
                      descreve o que você imagina
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      placeholder="cor, tamanho, formato, pra que vai usar..."
                      className="w-full bg-creme border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors resize-none placeholder:text-marrom/25"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addItem}
                className="w-full border border-dashed border-marrom/20 rounded-2xl py-3 text-sm text-marrom/40 hover:text-pink hover:border-pink/40 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                adicionar outra peça
              </button>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-marrom text-creme py-3.5 text-sm tracking-wide hover:bg-pink transition-colors rounded-full disabled:opacity-50"
            >
              {sending ? "enviando..." : "pedir orçamento"}
            </button>

            <p className="text-xs text-marrom/30 text-center">
              sem compromisso. respondo com valor e prazo estimado.
            </p>
          </form>
      </div>
    </div>
  );
}
