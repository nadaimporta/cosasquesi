import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCollections, getCollectionBySlug } from "@/lib/collections";
import { ProductGrid } from "@/components/products/ProductGrid";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = await getCollectionBySlug(slug);
  if (!col) return {};
  return {
    title: col.title,
    description: col.description,
    alternates: { canonical: `https://cosasquesi.com/colecciones/${col.slug}` },
  };
}

export default async function ColeccionPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <header className="max-w-2xl mb-16">
        <p className="text-xs uppercase tracking-widest text-stone mb-3">Colección</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-ink leading-tight mb-4">{collection.title}</h1>
        <p className="text-base text-stone leading-relaxed">{collection.description}</p>
      </header>
      <ProductGrid products={collection.products} />
    </div>
  );
}
