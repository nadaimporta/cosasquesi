"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { resolveProductUrl } from "@/lib/affiliate";
import { formatPrice } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import { StaffPickBadge } from "./StaffPickBadge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const affiliateUrl = resolveProductUrl(product);

  return (
    <article className="group flex flex-col gap-4">
      {/* Image */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={`Comprar ${product.brand} ${product.name} en Amazon (enlace de afiliado)`}
        className="relative aspect-square bg-white overflow-hidden rounded-2xl block"
      >
        {product.images[0] && (
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            className={`object-contain transition-transform duration-300 group-hover:scale-105 ${product.slug === "zubi-pouch-sotogrande" ? "p-10 object-center" : product.slug === "marvis-classic-strong-mint" ? "p-[20%]" : product.slug === "logitech-mx-master-4" ? "p-[20%]" : "p-10"}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {product.staffPick && (
          <div className="absolute top-3 left-3">
            <StaffPickBadge />
          </div>
        )}
      </a>

      {/* Meta */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/categorias/${product.category}`}
            className="text-[11px] uppercase tracking-widest text-stone hover:text-ink transition-colors"
          >
            {CATEGORIES[product.category]}
          </Link>
          <span className="text-sm font-medium text-ink">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>

        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-sm font-medium text-ink leading-snug hover:opacity-70 transition-opacity"
        >
          <span className="text-stone text-[11px] uppercase tracking-wider mr-1">
            {product.brand}
          </span>
          {product.name}
        </a>
      </div>
    </article>
  );
}
