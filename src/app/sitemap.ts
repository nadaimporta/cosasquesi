import type { MetadataRoute } from "next";
import { getAllProducts, getAllTags } from "@/lib/products";
import { getAllCollections } from "@/lib/collections";
import { CATEGORY_SLUGS } from "@/lib/categories";

const BASE_URL = "https://cosasquesi.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const collections = getAllCollections();
  const tags = await getAllTags();

  const productUrls = products.map((p) => ({
    url: `${BASE_URL}/productos/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const collectionUrls = collections.map((c) => ({
    url: `${BASE_URL}/colecciones/${c.slug}`,
    lastModified: new Date(c.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = CATEGORY_SLUGS.map((cat) => ({
    url: `${BASE_URL}/categorias/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const tagUrls = tags.map((tag) => ({
    url: `${BASE_URL}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/productos`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/colecciones`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/sobre-nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/aviso-legal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    ...categoryUrls,
    ...tagUrls,
    ...collectionUrls,
    ...productUrls,
  ];
}
