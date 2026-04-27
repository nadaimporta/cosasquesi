"use client";

import { useState } from "react";
import type { Product, Category } from "@/lib/types";
import { CATEGORIES, CATEGORY_SLUGS } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { ProductGrid } from "./ProductGrid";

interface ProductFilterProps {
  products: Product[];
}

export function ProductFilter({ products }: ProductFilterProps) {
  const [active, setActive] = useState<Category | "todos">("todos");

  const filtered =
    active === "todos" ? products : products.filter((p) => p.category === active);

  const usedCategories = CATEGORY_SLUGS.filter((cat) =>
    products.some((p) => p.category === cat)
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("todos")}
          className={cn(
            "px-4 py-1.5 text-xs uppercase tracking-widest border transition-colors",
            active === "todos"
              ? "bg-ink text-cream border-ink"
              : "border-mist text-stone hover:border-ink hover:text-ink"
          )}
        >
          Todos
        </button>
        {usedCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "px-4 py-1.5 text-xs uppercase tracking-widest border transition-colors",
              active === cat
                ? "bg-ink text-cream border-ink"
                : "border-mist text-stone hover:border-ink hover:text-ink"
            )}
          >
            {CATEGORIES[cat]}
          </button>
        ))}
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
