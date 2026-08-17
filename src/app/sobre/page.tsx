import Link from "next/link";

export const metadata = {
  title: "sobre - cacali",
  description:
    "toda cerâmica tem uma origem. essa começa com ansiedade, argila é uma cachorra chamada cacau.",
};

export default function SobrePage() {
  return (
    <div className="pt-28 pb-24">
      {/* hero */}
      <section className="max-w-3xl mx-auto px-6 text-center py-16">
        <h1 className="font-display text-5xl md:text-6xl font-light text-marrom">
          toda cerâmica tem uma origem.
        </h1>
        <p className="font-display text-xl md:text-2xl font-light text-marrom/60 mt-6 italic">
          essa começa com ansiedade,
          <br />
          argila é uma cachorra chamada cacau.
        </p>
      </section>

      {/* barbara */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[3/4] bg-bege/40 rounded-3xl flex items-center justify-center">
            <span className="font-display text-marrom/20 text-3xl italic">
              foto da barbara
            </span>
          </div>
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-light text-marrom">
              oi, eu sou a barbara.
            </h2>
            <div className="text-marrom/70 leading-relaxed space-y-4 text-sm">
              <p>
                designer de formação. fiz carreira criando marcas pra outras
                pessoas enquanto acumulava reunião que podia ser e-mail e abria o
                tiktok pra dissociar.
              </p>
              <p>
                ai comecei a fazer cerâmica.
              </p>
              <p>
                não porque era tendência. porque eu precisava colocar as mãos em
                algo real e ver um resultado que existia fora do computador.
              </p>
              <p className="font-display text-lg text-marrom italic">
                spoiler: me apaixonei. e o que era uma terapia, ganhou espaço e
                se tornou a parte mais divertida do dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* cacau */}
      <section className="bg-bege py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <h2 className="font-display text-3xl font-light text-marrom">
                e a inspiração por trás
                <br />
                de tudo isso?
              </h2>
              <div className="text-marrom/70 leading-relaxed space-y-4 text-sm">
                <p>
                  essa e a cacau.
                </p>
                <p>
                  border collie marrom e branca. o ser mais caloroso que eu
                  conheco. incapaz de entrar num cômodo sem iluminar.
                </p>
                <p>
                  em casa, o apelido foi virando cacale, depois cacali.
                </p>
                <p>
                  quando pensei no nome da marca, não precisei pensar muito.
                </p>
                <p className="font-display text-lg text-marrom italic">
                  a cacali — a cachorra — é o que eu quero que cada peça seja:
                  algo que chega, aquece, e fica. sem precisar se explicar.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 aspect-square bg-creme rounded-3xl flex items-center justify-center">
              <span className="font-display text-marrom/20 text-3xl italic">
                foto da cacau
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* virada */}
      <section className="bg-marrom text-creme py-24">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <p className="font-display text-2xl md:text-3xl font-light leading-relaxed">
            e sim — eu sei que é uma xícara superfaturada.
          </p>
          <p className="text-creme/70 leading-relaxed">
            mas é uma xícara que foi feita a mão, que passou pelo forno, que tem
            a minha impressão digital nela de algum jeito. não tem outra igual
            no mundo.
          </p>
          <p className="font-display text-xl font-light italic text-creme/50">
            isso não tem no shein.
          </p>
        </div>
      </section>

      {/* pra quem e */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="font-display text-2xl font-light text-marrom mb-8">
          compra cacali quem:
        </p>
        <div className="space-y-4 text-marrom/60">
          <p>paga o café specialty sem se arrepender depois.</p>
          <p>
            para no meio do scroll quando aparece algo feito a mão.
          </p>
          <p>
            da presente com intenção — não compra gift card.
          </p>
          <p>
            usa o objeto bonito todo dia, não guarda pra ocasião especial.
          </p>
          <p>tem um animal que e mais da familia do que pet.</p>
          <p className="text-marrom font-display text-lg italic pt-4">
            sabe que produto com história dura mais — em todos os sentidos.
          </p>
        </div>
        <Link
          href="/pecas"
          className="inline-flex items-center justify-center bg-marrom text-creme px-8 py-3.5 text-sm tracking-wide hover:bg-pink transition-colors rounded-full mt-12"
        >
          ver as peças
        </Link>
      </section>
    </div>
  );
}
