import Link from "next/link";
import type { Collection } from "@/lib/types";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/colecciones/${collection.slug}`}
      className="group flex flex-col gap-3 p-6 border border-mist hover:border-ink transition-colors duration-200"
    >
      <h3 className="font-serif text-xl text-ink group-hover:opacity-70 transition-opacity">
        {collection.title}
      </h3>
      <p className="text-sm text-stone leading-relaxed line-clamp-2">
        {collection.description}
      </p>
      <span className="text-xs uppercase tracking-widest text-stone mt-auto pt-2 border-t border-mist">
        {collection.productIds.length} productos →
      </span>
    </Link>
  );
}
