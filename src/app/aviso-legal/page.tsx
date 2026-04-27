import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal — Afiliados",
  description: "Información sobre el programa de afiliados de Amazon y el uso de este sitio.",
  alternates: { canonical: "https://cosasquesi.com/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-stone mb-4">Legal</p>
        <h1 className="font-serif text-4xl text-ink mb-10">Aviso legal</h1>

        <div className="flex flex-col gap-8 text-sm text-stone leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-ink mb-3">Programa de Afiliados de Amazon</h2>
            <p>
              cosasquesi.com es participante del Programa de Afiliados de Amazon EU, un programa
              de publicidad para afiliados diseñado para ofrecer a sitios web un modo de obtener
              comisiones por publicidad, mediante la creación de enlaces a Amazon.es.
            </p>
            <p className="mt-3">
              Esto significa que si haces clic en un enlace marcado con el aviso de afiliado y
              realizas una compra en Amazon, podemos recibir una comisión sin ningún coste
              adicional para ti. El precio que ves en Amazon es siempre el mismo, seas o no
              referido desde este sitio.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-3">Precios e información de productos</h2>
            <p>
              Los precios mostrados en este sitio son orientativos y pueden no reflejar el precio
              actual en Amazon. Antes de realizar cualquier compra, verifica siempre el precio
              actualizado en la página de Amazon correspondiente.
            </p>
            <p className="mt-3">
              La disponibilidad de los productos puede variar. No nos hacemos responsables de
              cambios en precio, disponibilidad o características de los productos listados.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-3">Independencia editorial</h2>
            <p>
              La participación en programas de afiliados no influye en la selección de productos.
              Solo incluimos productos que consideramos genuinamente buenos, independientemente
              de si generan comisión o no.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-3">Contacto</h2>
            <p>
              Para cualquier consulta relacionada con este aviso legal, puedes contactarnos en:{" "}
              <a
                href="mailto:hola@cosasquesi.com"
                className="text-ink underline hover:opacity-70 transition-opacity"
              >
                hola@cosasquesi.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
