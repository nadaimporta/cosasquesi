import type { Metadata } from "next";
import { getAllCollections } from "@/lib/collections";
import { CollectionGrid } from "@/components/collections/CollectionGrid";

export const metadata: Metadata = {
  title: "Colecciones",
  description: "Selecciones temáticas de productos curados. Cada colección cuenta una historia.",
  alternates: { canonical: "https://cosasquesi.com/colecciones" },
};

export default function ColeccionesPage() {
  const collections = getAllCollections();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-stone mb-2">Temáticas</p>
        <h1 className="font-serif text-4xl text-ink">Colecciones</h1>
      </div>
      <CollectionGrid collections={collections} />
    </div>
  );
}
