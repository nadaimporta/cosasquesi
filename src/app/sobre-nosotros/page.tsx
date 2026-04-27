import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Quiénes somos y por qué hacemos Cosas que sí.",
  alternates: { canonical: "https://cosasquesi.com/sobre-nosotros" },
};

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-stone mb-4">Nosotros</p>
        <h1 className="font-serif text-5xl text-ink leading-tight mb-10">
          Por qué<br />Cosas que sí
        </h1>

        <div className="flex flex-col gap-6 text-base text-stone leading-relaxed">
          <p>
            Vivimos rodeados de opciones. Demasiadas. Por cada producto bueno
            hay cincuenta mediocres que gritan más fuerte. <strong className="text-ink font-medium">Cosas que sí</strong> existe
            para cortar ese ruido.
          </p>
          <p>
            Solo publicamos lo que usamos, lo que hemos probado, o lo que vemos
            un valor real y consistente. Sin patrocinios encubiertos, sin
            rankings pagados. Si aparece aquí, es porque lo creemos genuinamente.
          </p>
          <p>
            Algunos enlaces son de afiliado — si compras a través de ellos,
            recibimos una pequeña comisión sin coste adicional para ti.
            Eso es lo que mantiene este proyecto vivo.{" "}
            <Link href="/aviso-legal" className="text-ink underline hover:opacity-70 transition-opacity">
              Más información sobre afiliados.
            </Link>
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-mist">
          <Link
            href="/productos"
            className="inline-block px-6 py-3 bg-ink text-cream text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            Explorar productos
          </Link>
        </div>
      </div>
    </div>
  );
}
