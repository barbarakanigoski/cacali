import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4 px-6">
        <p className="font-display text-3xl font-light text-burgundy">
          essa pagina nao existe.
        </p>
        <p className="text-burgundy/50">
          mas as pecas existem — e sao unicas.
        </p>
        <Link
          href="/pecas"
          className="inline-flex items-center justify-center bg-burgundy text-creme px-8 py-3.5 text-sm tracking-wide hover:bg-fucsia transition-colors rounded-full mt-4"
        >
          ver pecas
        </Link>
      </div>
    </div>
  );
}
