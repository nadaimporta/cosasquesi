import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/products";
import { CATEGORIES, CATEGORY_SLUGS } from "@/lib/categories";
import type { Category } from "@/lib/types";
import { ProductGrid } from "@/components/products/ProductGrid";

export const revalidate = 60;

interface Props {
  params: Promise<{ categoria: string }>;
}

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((cat) => ({ categoria: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const cat = categoria as Category;
  if (!CATEGORIES[cat]) return {};
  return {
    title: CATEGORIES[cat],
    description: `Productos de ${CATEGORIES[cat]} cuidadosamente seleccionados.`,
    alternates: { canonical: `https://cosasquesi.com/categorias/${cat}` },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const cat = categoria as Category;
  if (!CATEGORIES[cat]) notFound();

  const products = await getProductsByCategory(cat);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-stone mb-2">Categoría</p>
        <h1 className="font-serif text-4xl text-ink">{CATEGORIES[cat]}</h1>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
