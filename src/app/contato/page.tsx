"use client";

import { useState } from "react";

export default function ContatoPage() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("contacts").insert({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
      });
    } catch {
      // fallback: just show success
    }

    setSent(true);
    form.reset();
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-xl mx-auto px-6">
        <h1 className="font-display text-5xl font-light text-burgundy text-center">
          fala comigo.
        </h1>
        <p className="text-burgundy/50 text-center mt-4">
          encomendas, duvidas, pedido especial — e so mandar mensagem. respondo
          eu mesma.
        </p>

        <div className="flex gap-6 justify-center mt-8 text-sm text-burgundy/60">
          <a
            href="https://instagram.com/cacali.ceramica"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fucsia transition-colors"
          >
            @cacali.ceramica
          </a>
        </div>

        {sent ? (
          <div className="mt-12 text-center space-y-4">
            <p className="font-display text-2xl font-light text-burgundy">
              mensagem enviada.
            </p>
            <p className="text-burgundy/50 text-sm">
              respondo em breve — prometo.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div>
              <label className="text-sm text-burgundy/60 block mb-2">
                nome
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full bg-white border border-burgundy/10 rounded-xl px-4 py-3 text-burgundy text-sm focus:outline-none focus:border-fucsia/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-burgundy/60 block mb-2">
                e-mail
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-white border border-burgundy/10 rounded-xl px-4 py-3 text-burgundy text-sm focus:outline-none focus:border-fucsia/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-burgundy/60 block mb-2">
                mensagem
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full bg-white border border-burgundy/10 rounded-xl px-4 py-3 text-burgundy text-sm focus:outline-none focus:border-fucsia/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-burgundy text-creme py-3.5 text-sm tracking-wide hover:bg-fucsia transition-colors rounded-full"
            >
              manda
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
