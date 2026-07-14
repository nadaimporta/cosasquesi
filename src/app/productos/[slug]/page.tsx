import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { resolveProductUrl } from "@/lib/affiliate";
import { formatPrice } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import { StaffPickBadge } from "@/components/products/StaffPickBadge";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Badge } from "@/components/ui/Badge";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.brand} ${product.name}`,
    description: product.description,
    openGraph: { images: product.images[0] ? [product.images[0].src] : [] },
    alternates: { canonical: `https://cosasquesi.com/productos/${product.slug}` },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const productUrl = resolveProductUrl(product);
  const isAmazon = !!product.amazonAsin;
  const related = await getRelatedProducts(product);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.src),
    brand: { "@type": "Brand", name: product.brand },
    ...(product.amazonAsin ? { sku: product.amazonAsin } : {}),
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: product.currency,
      price: product.price,
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }}
      />

      <nav className="flex items-center gap-2 text-xs text-stone mb-10">
        <Link href="/productos" className="hover:text-ink transition-colors">Productos</Link>
        <span>/</span>
        <Link href={`/categorias/${product.category}`} className="hover:text-ink transition-colors">
          {CATEGORIES[product.category]}
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              className={`object-contain ${product.slug === "marvis-classic-strong-mint" ? "p-[20%]" : product.slug === "logitech-mx-master-4" ? "p-[20%]" : product.slug === "fujifilm-x100vi" ? "p-[15%]" : product.slug === "apple-airpods-pro-3" ? "p-[20%]" : product.slug === "alessi-tetera-9093" ? "p-[15%]" : product.slug === "stanley-termo-cafe-go" ? "p-[20%]" : product.slug === "normann-krenit-skal" ? "p-[25%]" : "p-10"}`}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-stone text-sm">
              Sin imagen
            </div>
          )}
          {product.staffPick && (
            <div className="absolute top-4 left-4"><StaffPickBadge /></div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone">
              <Link href={`/categorias/${product.category}`} className="hover:text-ink transition-colors">
                {CATEGORIES[product.category]}
              </Link>
              <span aria-hidden>·</span>
              <span>{product.brand}</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 mt-2">
              <h1 className="font-serif text-4xl sm:text-5xl text-ink leading-snug text-balance">{product.name}</h1>
              <div className="flex items-baseline gap-1.5 shrink-0">
                {product.originalPrice && (
                  <span className="text-xs text-stone line-through">
                    {formatPrice(product.originalPrice, product.currency)}
                  </span>
                )}
                <span className="text-sm text-pebble whitespace-nowrap">{formatPrice(product.price, product.currency)}</span>
              </div>
            </div>
          </div>

          {product.subtitle && (
            <p className="font-serif italic text-lg text-ink leading-snug">{product.subtitle}</p>
          )}
          <p className="text-base text-stone leading-relaxed max-w-[46ch]">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
            </div>
          )}

          <hr className="border-mist mt-2" />

          <div className="flex items-center gap-4">
            <ExternalLink
              href={productUrl}
              label={`Comprar ${product.brand} ${product.name}${isAmazon ? " en Amazon (enlace de afiliado)" : ""}`}
              className="self-start px-8 py-2.5 text-sm font-medium tracking-widest uppercase text-center bg-ink text-cream hover:opacity-80 transition-opacity"
            >
              Comprar
            </ExternalLink>
            {isAmazon && (
              <span className="text-xs text-stone">en Amazon · enlace de afiliado</span>
            )}
          </div>

          {isAmazon && (
            <p className="text-[11px] text-stone -mt-3">
              El precio puede variar.{" "}
              <Link href="/aviso-legal" className="underline">Más información</Link>
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <hr className="border-mist mb-10" />
          <p className="text-xs uppercase tracking-widest text-stone mb-8">También te puede interesar</p>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
