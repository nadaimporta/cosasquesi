import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { ProductFilter } from "@/components/products/ProductFilter";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Todos los productos",
  description: "Catálogo completo de productos curados. Solo lo que merece tu atención.",
  alternates: { canonical: "https://cosasquesi.com/productos" },
};

export default async function ProductosPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-sm text-stone mb-1 max-w-lg">La vida es demasiado corta como para no rodearse de cosas bonitas</p>
        <h1 className="font-serif text-4xl text-ink">Cosas que sí</h1>
      </div>
      <ProductFilter products={products} />
    </div>
  );
}
