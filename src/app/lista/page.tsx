"use client";

import { useState } from "react";

export default function ListaPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email") as string;

    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("waitlist").insert({ email });
    } catch {
      // fallback
    }

    setSubmitted(true);
    form.reset();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-light text-burgundy">
          as pecas estao no forno.
        </h1>
        <p className="text-burgundy/50 mt-6 max-w-md mx-auto">
          a cacali produz em pequenos lotes. quando acaba, fica vazia ate a
          proxima fornada.
        </p>

        {submitted ? (
          <div className="mt-12 space-y-4">
            <p className="font-display text-2xl font-light text-burgundy">
              voce esta na lista.
            </p>
            <p className="text-burgundy/50 text-sm">
              aviso voce antes de todo mundo — prometo.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="seu e-mail"
              className="flex-1 bg-white border border-burgundy/10 rounded-full px-6 py-3 text-burgundy text-sm focus:outline-none focus:border-fucsia/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-burgundy text-creme px-8 py-3 text-sm tracking-wide hover:bg-fucsia transition-colors rounded-full whitespace-nowrap"
            >
              quero saber
            </button>
          </form>
        )}

        <p className="text-xs text-burgundy/30 mt-6">
          sem spam. so ceramica. prometido.
        </p>

        <div className="mt-12">
          <a
            href="https://instagram.com/cacali.ceramica"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-burgundy/50 hover:text-fucsia transition-colors"
          >
            ou aparece no instagram — e la que a gente avisa primeiro.
          </a>
        </div>
      </div>
    </div>
  );
}
