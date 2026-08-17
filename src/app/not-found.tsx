import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4 px-6">
        <p className="font-display text-3xl font-light text-marrom">
          essa página não existe.
        </p>
        <p className="text-marrom/50">
          mas as peças existem — e sao únicas.
        </p>
        <Link
          href="/pecas"
          className="inline-flex items-center justify-center bg-marrom text-creme px-8 py-3.5 text-sm tracking-wide hover:bg-pink transition-colors rounded-full mt-4"
        >
          ver peças
        </Link>
      </div>
    </div>
  );
}
