import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Product, Category } from "./types";
import { fetchAmazonImage } from "./amazon-image";

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

const DATABASE_ID = process.env.NOTION_PRODUCTS_DATABASE_ID!;

function getText(page: PageObjectResponse, field: string): string {
  const prop = page.properties[field];
  if (!prop) return "";
  if (prop.type === "title") return prop.title[0]?.plain_text ?? "";
  if (prop.type === "rich_text") return prop.rich_text[0]?.plain_text ?? "";
  if (prop.type === "url") return prop.url ?? "";
  return "";
}

function getNumber(page: PageObjectResponse, field: string): number {
  const prop = page.properties[field];
  if (prop?.type === "number") return prop.number ?? 0;
  return 0;
}

function getCheckbox(page: PageObjectResponse, field: string): boolean {
  const prop = page.properties[field];
  if (prop?.type === "checkbox") return prop.checkbox;
  return false;
}

function getSelect(page: PageObjectResponse, field: string): string {
  const prop = page.properties[field];
  if (prop?.type === "select") return prop.select?.name ?? "";
  return "";
}

function getMultiSelect(page: PageObjectResponse, field: string): string[] {
  const prop = page.properties[field];
  if (prop?.type === "multi_select") return prop.multi_select.map((o) => o.name);
  return [];
}

function getDate(page: PageObjectResponse, field: string): string {
  const prop = page.properties[field];
  if (prop?.type === "date") return prop.date?.start ?? "";
  return new Date().toISOString().split("T")[0];
}

async function mapPageToProduct(page: PageObjectResponse): Promise<Product | null> {
  if (!getCheckbox(page, "Publicado")) return null;

  const slug = getText(page, "Slug") || page.id;
  const asin = getText(page, "ASIN");
  const name = getText(page, "Nombre");

  let imageUrl = getText(page, "Imagen URL");
  if (!imageUrl && asin) {
    imageUrl = await fetchAmazonImage(asin);
  }

  return {
    id: page.id,
    slug,
    brand: getText(page, "Marca"),
    name,
    description: getText(page, "Descripción"),
    category: getSelect(page, "Categoría") as Category,
    tags: getMultiSelect(page, "Tags"),
    price: getNumber(page, "Precio"),
    currency: "EUR",
    amazonAsin: asin,
    images: imageUrl ? [{ src: imageUrl, alt: name }] : [],
    staffPick: getCheckbox(page, "Selección editorial"),
    publishedAt: getDate(page, "Fecha publicación"),
  };
}

export async function fetchAllProducts(): Promise<Product[]> {
  if (!DATABASE_ID || DATABASE_ID === "undefined") {
    console.warn("NOTION_PRODUCTS_DATABASE_ID is not set");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: "Publicado", checkbox: { equals: true } },
      sorts: [{ property: "Fecha publicación", direction: "descending" }],
    });

    const pages = response.results.filter(
      (p): p is PageObjectResponse => p.object === "page" && "properties" in p
    );

    const products = await Promise.all(pages.map(mapPageToProduct));
    return products.filter((p): p is Product => p !== null);
  } catch (error) {
    console.error("Error fetching products from Notion:", error);
    return [];
  }
}
