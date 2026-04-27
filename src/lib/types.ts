export type Category =
  | "tech"
  | "hogar"
  | "workspace"
  | "carry"
  | "libros"
  | "comics"
  | "lifestyle"
  | "relojes"
  | "viaje";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  price: number;
  currency: string;
  amazonAsin: string;
  images: ProductImage[];
  staffPick: boolean;
  featured: boolean;
  publishedAt: string;
  updatedAt?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  productIds: string[];
}

export interface CollectionWithProducts extends Collection {
  products: Product[];
}
