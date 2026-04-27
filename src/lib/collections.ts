import type { Collection, CollectionWithProducts } from "./types";
import { getProductsByIds } from "./products";

import homeOfficeData from "@/data/collections/home-office-goals.json";
import everydayCarryData from "@/data/collections/everyday-carry.json";
import escritorioData from "@/data/collections/escritorio-minimalista.json";

const ALL_COLLECTIONS: Collection[] = [
  homeOfficeData,
  everydayCarryData,
  escritorioData,
] as Collection[];

export function getAllCollections(): Collection[] {
  return ALL_COLLECTIONS;
}

export async function getCollectionBySlug(slug: string): Promise<CollectionWithProducts | undefined> {
  const collection = ALL_COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return undefined;
  return {
    ...collection,
    products: await getProductsByIds(collection.productIds),
  };
}
