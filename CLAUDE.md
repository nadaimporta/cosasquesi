# Cosas que sí — CLAUDE.md

Contexto técnico del proyecto para trabajar aquí con Claude Code. (Trasladado
desde `Documentación/resumen-tecnico.txt`, mayo 2026.)

## Qué es

Site de productos curados con enlaces de afiliado a Amazon. El contenido
(productos) se gestiona desde Notion sin tocar código. Público en
cosasquesi.com, deployado en Vercel.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 3
- `@notionhq/client` 2 (SDK oficial de Notion)
- `@vercel/analytics` (analytics sin cookies)
- Fuentes: Geist (sans) + Playfair Display (serif), desde Google Fonts
- Repo: github.com/nadaimporta/cosasquesi (privado)

## Estructura de carpetas relevante

```
src/
  app/                      → rutas (App Router de Next.js)
    page.tsx                → homepage, lista todos los productos
    productos/[slug]/       → página de producto individual
    categorias/[categoria]/ → productos filtrados por categoría
    colecciones/[slug]/     → colecciones editoriales
    sobre-nosotros/         → página estática
    aviso-legal/            → página estática
  components/
    products/               → ProductCard, ProductGrid, ProductFilter
    collections/            → CollectionCard, CollectionGrid
    layout/                 → Header, Footer, AffiliateDisclosure
    ui/                     → FadeIn, Grain, CursorGlow, ClickSound, etc.
  lib/
    notion.ts               → conexión a Notion, mapeo de datos
    products.ts             → helpers para obtener productos
    collections.ts          → helpers para colecciones
    affiliate.ts            → construcción de URLs de afiliado Amazon
    amazon-image.ts         → scraping de imagen desde Amazon (fallback)
    categories.ts           → mapa de categorías
    types.ts                → tipos TypeScript (Product, Collection, etc.)
  data/collections/         → JSONs de colecciones editoriales (estáticas)
```

## Cómo fluyen los datos

1. Los productos viven en una base de datos de Notion:
   "Productos — Cosas que sí" (ID: `00c704accd9e45c9a1c29f0cc90b67bd`).

2. Campos principales por producto:
   - Nombre (título)
   - Marca (texto)
   - ASIN (código Amazon, 10 caracteres — de la URL amazon.es/dp/XXXXXXXXXX)
   - Categoría (select): tech, hogar, workspace, carry, libros, comics,
     lifestyle, relojes, viaje, moda, hedonismos
   - Tags (multi-select)
   - Precio (número, euros)
   - Descripción (texto largo)
   - Slug (texto, sin espacios — define la URL del producto)
   - Imagen URL (URL — si se deja vacía, intenta scrapearse de Amazon via ASIN)
   - Publicado (checkbox — solo aparece en la web si está marcado)
   - Me flipa (checkbox — aparece en homepage con badge especial)
   - Fecha publicación (fecha)

3. En cada request, Next.js llama a Notion via su SDK oficial y mapea los
   datos al tipo `Product`. Solo se devuelven los que tienen `Publicado = true`.

4. Los enlaces a Amazon llevan el tag de afiliado (`cosasquesi-21`) añadido
   automáticamente por `affiliate.ts`:
   `https://www.amazon.es/dp/{ASIN}?tag=cosasquesi-21&linkCode=as2`
   Si el producto no tiene ASIN, se usa el campo URL como enlace directo.

5. Las colecciones editoriales (Escritorio minimalista, Home Office Goals,
   Everyday Carry) son JSONs estáticos en `src/data/collections/`, no vienen
   de Notion.

## Imágenes

- Lo ideal: rellenar "Imagen URL" en Notion con la URL directa de Amazon
  (clic derecho sobre la foto del producto → Copiar dirección de imagen).
- Fallback automático: si no hay Imagen URL, `amazon-image.ts` intenta
  scrapear la imagen de amazon.es usando el ASIN. Amazon suele bloquearlo,
  así que se recomienda siempre poner la URL manualmente.
- Timeout: el scraping tiene un límite de 5 segundos para no bloquear el
  render de la página.
- Next.js sirve todas las imágenes externas optimizadas (`remotePatterns: "*"`).
- Algunos productos tienen padding personalizado por slug en `ProductCard.tsx`
  para que la imagen quede bien encuadrada (ej. Köln Concert: `p-[15%]`).

## Variables de entorno

Archivo: `.env.local` (no se sube a git)

```
NOTION_API_KEY=secret_...          # API key de la integración de Notion
NOTION_PRODUCTS_DATABASE_ID=...    # ID de la base de datos de productos
AMAZON_AFFILIATE_TAG=cosasquesi-21 # tag de afiliado Amazon
```

En Vercel estas variables están configuradas en el panel del proyecto.

## Despliegue (producción)

- Vercel conectado al repo de GitHub (`nadaimporta/cosasquesi`, rama `main`).
- Cada push a `main` dispara un deploy automático en Vercel.
- El dominio cosasquesi.com apunta a Vercel.
- Analytics: `@vercel/analytics`, sin cookies, integrado en el layout.

## Caché / revalidación

- La homepage tiene `export const revalidate = 60` → Next.js regenera la
  página en background cada 60 segundos (ISR). Los cambios en Notion pueden
  tardar hasta 1 minuto en aparecer en producción sin necesidad de redeploy.
- En la práctica, para ver cambios inmediatos en producción basta con hacer
  un push vacío o redeploy manual desde el panel de Vercel.
- En desarrollo (`npm run dev` en localhost:3000 o :3001), los datos se
  obtienen frescos de Notion en cada recarga.

## Flujo de trabajo habitual

**Para añadir un producto nuevo:**
1. En Notion, crear una fila en "Productos — Cosas que sí" con: Nombre,
   Marca, ASIN, Categoría, Precio, Descripción, Slug, Imagen URL.
2. Marcar Publicado = true cuando esté listo.
3. Si se quiere ver en local antes de publicar: `npm run dev` → localhost:3001.
4. Para publicar en producción: push a `main` (o redeploy en Vercel).
   Vercel tarda ~1-2 minutos en desplegar.

**Para cambios de código (diseño, componentes, etc.):**
1. Editar los archivos en `src/`.
2. Verificar en local con `npm run dev`.
3. `git add` + `git commit` + `git push` → Vercel despliega automáticamente.

**Herramientas que se usan:**
- Notion: gestión de contenido (productos)
- GitHub: control de versiones del código
- Vercel: hosting y despliegue continuo
- Claude (FleetView): asistente para añadir productos y hacer cambios

## Notas

- El campo "Me flipa" es el equivalente a un staff pick: aparece en la
  homepage con un badge especial y está pensado para destacar lo mejor.
- El slug define la URL pública: `cosasquesi.com/productos/{slug}`.
  Usar solo minúsculas y guiones, sin espacios ni caracteres especiales.
- Las colecciones no tienen backend en Notion; si se quieren editar hay que
  tocar los JSONs en `src/data/collections/`.
