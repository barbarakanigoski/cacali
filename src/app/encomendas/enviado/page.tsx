"use client";

import Link from "next/link";
import Image from "next/image";

export default function EnviadoPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen flex items-center">
      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
        <Image src="/icon-cacau.png" alt="cacau" width={80} height={80} className="mx-auto mb-6" />
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-marrom">
          pedido recebido.
        </h1>
        <p className="text-marrom/50 mt-6 max-w-sm mx-auto">
          vou analisar com carinho e respondo em breve com o orçamento.
          enquanto isso, o barro descansa — e você também.
        </p>

        <div className="mt-10 space-y-3">
          <Link
            href="/encomendas"
            className="block w-full max-w-xs mx-auto bg-marrom text-creme py-3.5 text-sm tracking-wide hover:bg-pink transition-colors rounded-full"
          >
            enviar outro pedido
          </Link>
          <Link
            href="/pecas"
            className="block w-full max-w-xs mx-auto border border-marrom/15 text-marrom py-3.5 text-sm tracking-wide hover:border-pink hover:text-pink transition-colors rounded-full"
          >
            ver peças prontas
          </Link>
          <Link
            href="/"
            className="inline-block mt-4 text-sm text-marrom/40 hover:text-pink transition-colors underline underline-offset-4"
          >
            voltar pro início
          </Link>
        </div>

        <p className="text-xs text-marrom/30 mt-12">
          respondo pelo e-mail que você informou — fica de olho.
        </p>
      </div>
    </div>
  );
}
