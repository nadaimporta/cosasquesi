import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-mist mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-serif text-base text-ink">Cosas que sí</span>
          <p className="text-xs text-stone">
            La vida es demasiado corta como para no rodearse de cosas bonitas.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/productos" className="text-xs text-stone hover:text-ink transition-colors uppercase tracking-widest">
            Productos
          </Link>
          <Link href="/colecciones" className="text-xs text-stone hover:text-ink transition-colors uppercase tracking-widest">
            Colecciones
          </Link>
          <Link href="/sobre-nosotros" className="text-xs text-stone hover:text-ink transition-colors uppercase tracking-widest">
            De qué va esto
          </Link>
          <Link href="/aviso-legal" className="text-xs text-stone hover:text-ink transition-colors uppercase tracking-widest">
            Aviso legal
          </Link>
        </nav>
      </div>


    </footer>
  );
}
