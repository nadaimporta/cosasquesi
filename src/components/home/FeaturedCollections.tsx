import Link from "next/link";
import type { Collection } from "@/lib/types";
import { CollectionGrid } from "@/components/collections/CollectionGrid";

interface FeaturedCollectionsProps {
  collections: Collection[];
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-mist">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-stone mb-2">
            Temáticas
          </p>
          <h2 className="font-serif text-3xl text-ink">Colecciones</h2>
        </div>
        <Link
          href="/colecciones"
          className="text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors hidden sm:block"
        >
          Ver todas →
        </Link>
      </div>
      <CollectionGrid collections={collections} />
    </section>
  );
}
