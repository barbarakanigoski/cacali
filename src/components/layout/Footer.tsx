import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-burgundy text-creme">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-display text-2xl font-light mb-2">cacali</p>
            <p className="font-curved text-sm opacity-70">
              ceramica artesanal
            </p>
            <p className="text-sm opacity-50 mt-4">
              por barbara kanigoski
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <Link href="/pecas" className="opacity-70 hover:opacity-100 transition-opacity">
              pecas
            </Link>
            <Link href="/sobre" className="opacity-70 hover:opacity-100 transition-opacity">
              sobre
            </Link>
            <Link href="/contato" className="opacity-70 hover:opacity-100 transition-opacity">
              contato
            </Link>
            <Link href="/lista" className="opacity-70 hover:opacity-100 transition-opacity">
              lista de espera
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href="https://instagram.com/cacali.ceramica"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              @cacali.ceramica
            </a>
          </div>
        </div>

        <div className="border-t border-creme/10 mt-12 pt-8 text-center">
          <p className="font-display text-lg font-light italic opacity-60">
            feito com maos. sentido com alma.
          </p>
          <p className="text-xs opacity-30 mt-4">
            cacali &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
