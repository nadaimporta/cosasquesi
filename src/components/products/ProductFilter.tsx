"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, Category } from "@/lib/types";
import { CATEGORIES, CATEGORY_SLUGS } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { ProductGrid } from "./ProductGrid";

interface ProductFilterProps {
  products: Product[];
}

export function ProductFilter({ products }: ProductFilterProps) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<Category | "todos">("todos");

  useEffect(() => {
    const cat = searchParams.get("categoria") as Category | null;
    setActive(cat || "todos");
  }, [searchParams]);

  const filtered =
    active === "todos" ? products : products.filter((p) => p.category === active);

  const usedCategories = CATEGORY_SLUGS.filter((cat) =>
    products.some((p) => p.category === cat)
  );

  function toggle(cat: Category) {
    const next = active === cat ? "todos" : cat;
    setActive(next);
    const url = next === "todos" ? "/" : `/?categoria=${next}`;
    window.history.pushState(null, "", url);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {usedCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggle(cat)}
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
