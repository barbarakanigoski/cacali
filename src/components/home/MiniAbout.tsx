import Link from "next/link";

export function MiniAbout() {
  return (
    <section className="py-24 md:py-32 bg-peonia">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[3/4] bg-creme rounded-3xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-peonia/50">
              <span className="font-display text-burgundy/20 text-4xl italic">
                foto da barbara
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <p className="font-display text-3xl md:text-4xl font-light text-burgundy leading-snug">
              toda ceramica tem uma origem.
            </p>
            <p className="font-display text-xl font-light text-burgundy/60 italic">
              essa comeca com ansiedade,
              <br />
              argila e uma cachorra chamada cacau.
            </p>
            <Link
              href="/sobre"
              className="inline-flex items-center text-burgundy text-sm hover:text-fucsia transition-colors group"
            >
              conhecer a historia
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
