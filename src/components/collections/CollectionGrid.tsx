import type { Collection } from "@/lib/types";
import { CollectionCard } from "./CollectionCard";

interface CollectionGridProps {
  collections: Collection[];
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((col) => (
        <CollectionCard key={col.id} collection={col} />
      ))}
    </div>
  );
}
