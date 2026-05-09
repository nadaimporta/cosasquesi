import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "De qué va esto",
  description: "Cosas que sí pretende celebrar la ligereza, las cosas bonitas, cachitos de belleza.",
  alternates: { canonical: "https://cosasquesi.com/sobre-nosotros" },
};

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-stone mb-4">Los porqués</p>
        <h1 className="font-serif text-5xl text-ink leading-tight mb-4">
          De qué va esto
        </h1>
        <p className="text-base text-stone leading-relaxed mb-10">La vida es demasiado corta como para no rodearse de cosas bonitas.</p>

        <div className="flex flex-col gap-6 text-base text-stone leading-relaxed">
          <p>
            <strong className="text-ink font-medium">Cosas que sí</strong> tan solo pretende celebrar la ligereza, las cosas bonitas, cachitos de belleza. Es que tengo clarísimo que nada importa más que lo cotidiano, esos objetos que hacen nuestra vida (nuestro día a día) mejor, más amable, más luminoso.
          </p>
          <p>
            Es lo que encontrarás aquí: una selección infinita (que iré construyendo) de objetos con alma, productos con relato, cosas de verdad: libros, cómics, objetos, perfumes, detalles para casa y hedonismos que me emocionan. Yo qué sé, iré añadiendo lo que se me vaya ocurriendo, sin periodicidad: aquí hemos venido a jugar.
          </p>
          <p>
            Me llamo Jesús Terrés. Autor de{" "}
            <a href="https://circulodetiza.es/libros/nada-importa/" target="_blank" rel="noopener noreferrer" className="text-ink underline hover:opacity-70 transition-opacity">Nada importa</a>
            {" "}y{" "}
            <a href="https://www.planetadelibros.com/libro-buscaba-la-belleza/374221/" target="_blank" rel="noopener noreferrer" className="text-ink underline hover:opacity-70 transition-opacity">Buscaba la belleza</a>
            . Mi nuevo libro se titula{" "}
            <a href="https://www.planetadelibros.com/libro-vivir-sin-miedo/411772" target="_blank" rel="noopener noreferrer" className="text-ink underline hover:opacity-70 transition-opacity">Vivir sin miedo</a>
            {" "}y lo edita Destino.
          </p>
          <p>
            Escribo en torno a cosas que amar en{" "}
            <a href="https://www.revistavanityfair.es/autor/jesus/1106" target="_blank" rel="noopener noreferrer" className="text-ink underline hover:opacity-70 transition-opacity">Vanity Fair</a>
            , sobre viajes y gastronomías en{" "}
            <a href="http://www.traveler.es/autor/jesus-terres/3" target="_blank" rel="noopener noreferrer" className="text-ink underline hover:opacity-70 transition-opacity">Condé Nast Traveler</a>
            {" "}y mis cartas{" "}
            <a href="https://nadaimporta.substack.com/" target="_blank" rel="noopener noreferrer" className="text-ink underline hover:opacity-70 transition-opacity">íntimas</a>
            {" "}de cada sábado por la mañana.
          </p>
          <p>
            Si quieres saber más sobre mí, escribirme o qué se yo, puedes hacerlo desde{" "}
            <a href="https://www.notion.so/Preguntas-y-respuestas-0bd8822eaeb6479b94b58bc96100b717" target="_blank" rel="noopener noreferrer" className="text-ink underline hover:opacity-70 transition-opacity">aquí</a>
            .
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-mist">
          <p className="text-xs text-stone leading-relaxed">
            Algunos de los productos (los que puedes comprar ahí) forman parte del Programa de Afiliados de Amazon. Los precios pueden variar.{" "}
            <Link href="/aviso-legal" className="underline hover:opacity-70 transition-opacity">Aviso legal</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
