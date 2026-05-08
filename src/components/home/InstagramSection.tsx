export function InstagramSection() {
  return (
    <section className="py-24 md:py-32 bg-creme">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-light text-burgundy">
          quer ver como nasce?
        </h2>
        <p className="text-burgundy/50 mt-4">
          a gente documenta tudo — a argila, o forno, os erros, e a cacau
          tentando participar no meio.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square bg-peonia/30 rounded-2xl flex items-center justify-center"
            >
              <span className="font-display text-burgundy/15 text-lg italic">
                instagram {i}
              </span>
            </div>
          ))}
        </div>

        <a
          href="https://instagram.com/cacali.ceramica"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-burgundy text-sm hover:text-fucsia transition-colors group mt-8"
        >
          @cacali.ceramica
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </a>
      </div>
    </section>
  );
}
