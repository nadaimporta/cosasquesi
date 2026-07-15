import type { Product, Category } from "./types";
import { fetchAllProducts } from "./notion";

export async function getAllProducts(): Promise<Product[]> {
  return fetchAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await fetchAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products.filter((p) => p.category === category);
}

export async function getProductsByTag(tag: string): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products.filter((p) => p.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const products = await fetchAllProducts();
  const tags = new Set<string>();
  products.forEach((p) => p.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export async function getStaffPicks(limit = 6): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products.filter((p) => p.staffPick).slice(0, limit);
}


export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  const products = await fetchAllProducts();
  return ids.map((id) => products.find((p) => p.id === id || p.slug === id)).filter(Boolean) as Product[];
}
