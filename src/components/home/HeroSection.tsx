import Link from "next/link";

export function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-stone mb-4">
          Selección editorial
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl text-ink leading-tight mb-6">
          Lo mejor,<br />sin el ruido.
        </h1>
        <p className="text-base text-stone leading-relaxed mb-8 max-w-md">
          La vida es demasiado corta como para no rodearse de cosas bonitas.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/productos"
            className="px-6 py-3 bg-ink text-cream text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            Ver todo
          </Link>
          <Link
            href="/colecciones"
            className="px-6 py-3 border border-mist text-ink text-sm uppercase tracking-widest hover:border-ink transition-colors"
          >
            Colecciones
          </Link>
        </div>
      </div>
    </section>
  );
}
