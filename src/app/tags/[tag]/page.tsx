import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByTag, getAllTags } from "@/lib/products";
import { ProductGrid } from "@/components/products/ProductGrid";

export const revalidate = 60;

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `Productos con el tag ${tag}.`,
    alternates: { canonical: `https://cosasquesi.com/tags/${tag}` },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const products = await getProductsByTag(tag);
  if (products.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-stone mb-2">Tag</p>
        <h1 className="font-serif text-4xl text-ink">#{tag}</h1>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
