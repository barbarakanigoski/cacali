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
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-marrom">
          as peças estão no forno.
        </h1>
        <p className="text-marrom/50 mt-6 max-w-md mx-auto">
          a cacali produz em pequenos lotes. quando acaba, fica vazia até a
          próxima fornada.
        </p>

        {submitted ? (
          <div className="mt-12 space-y-4">
            <p className="font-display text-2xl font-light text-marrom">
              você esta na lista.
            </p>
            <p className="text-marrom/50 text-sm">
              aviso você antes de todo mundo — prometo.
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
              className="flex-1 bg-white border border-marrom/10 rounded-full px-6 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-marrom text-creme px-8 py-3 text-sm tracking-wide hover:bg-pink transition-colors rounded-full whitespace-nowrap"
            >
              quero saber
            </button>
          </form>
        )}

        <p className="text-xs text-marrom/30 mt-6">
          sem spam. só cerâmica. prometido.
        </p>

        <div className="mt-12">
          <a
            href="https://instagram.com/cacali.ceramica"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-marrom/50 hover:text-pink transition-colors"
          >
            ou aparece no instagram — e la que a gente avisa primeiro.
          </a>
        </div>
      </div>
    </div>
  );
}
