import Link from "next/link";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-creme relative overflow-hidden pt-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] text-burgundy">
          sim, e uma xicara
          <br />
          <span className="italic">superfaturada.</span>
        </h1>
        <p className="font-display text-2xl md:text-3xl font-light text-burgundy/60 mt-8">
          e voce vai querer assim mesmo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/pecas"
            className="inline-flex items-center justify-center bg-burgundy text-creme px-8 py-3.5 text-sm tracking-wide hover:bg-fucsia transition-colors rounded-full"
          >
            ver as pecas
          </Link>
          <Link
            href="/sobre"
            className="inline-flex items-center justify-center border border-burgundy/20 text-burgundy px-8 py-3.5 text-sm tracking-wide hover:border-burgundy/40 transition-colors rounded-full"
          >
            quem faz isso aqui
          </Link>
        </div>
      </div>
    </section>
  );
}
