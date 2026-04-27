import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductGrid } from "@/components/products/ProductGrid";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-mist">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-stone mb-2">
            Selección editorial
          </p>
          <h2 className="font-serif text-3xl text-ink">Favoritos</h2>
        </div>
        <Link
          href="/productos"
          className="text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors hidden sm:block"
        >
          Ver todos →
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
