import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { resolveProductUrl } from "@/lib/affiliate";
import { formatPrice } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";
import { StaffPickBadge } from "@/components/products/StaffPickBadge";
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
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
              className={`object-contain ${product.slug === "marvis-classic-strong-mint" ? "p-[20%]" : product.slug === "logitech-mx-master-4" ? "p-[20%]" : "p-10"}`}
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
            <Link href={`/categorias/${product.category}`} className="text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors">
              {CATEGORIES[product.category]}
            </Link>
            <p className="text-xs uppercase tracking-widest text-stone mt-1">{product.brand}</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink mt-2 leading-snug">{product.name}</h1>
          </div>

          <p className="text-2xl font-medium text-ink">{formatPrice(product.price, product.currency)}</p>

          <p className="text-base text-stone leading-relaxed">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
            </div>
          )}

          <ExternalLink
            href={productUrl}
            label={`Comprar ${product.brand} ${product.name}${isAmazon ? " en Amazon (enlace de afiliado)" : ""}`}
            className="mt-4 py-4 text-sm font-medium tracking-widest uppercase text-center bg-ink text-cream hover:opacity-80 transition-opacity"
          >
            {isAmazon ? "Comprar en Amazon" : "Comprar"}
          </ExternalLink>

          {isAmazon && (
            <p className="text-[11px] text-stone">
              Enlace de afiliado. El precio puede variar.{" "}
              <Link href="/aviso-legal" className="underline">Más información</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
