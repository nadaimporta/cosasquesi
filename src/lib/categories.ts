import type { Category } from "./types";

export const CATEGORIES: Record<Category, string> = {
  tech: "Techie",
  hogar: "Hogar",
  workspace: "Escritorio",
  carry: "Carry",
  libros: "Libros",
  comics: "Cómics",
  lifestyle: "Lifestyle",
  relojes: "Relojes",
  viaje: "Viajar",
};

export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as Category[];
