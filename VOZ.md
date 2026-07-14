# Voz — fichas de producto

Notas de trabajo sobre cómo escribimos las fichas de producto de cosasquesi.com. Documento vivo: se actualiza cada vez que iteramos el método o encontramos una regla nueva.

## La idea central

Cada ficha de producto tiene dos textos con trabajos distintos, y no deben mezclarse:

- **Descripción** (campo `Descripción` en Notion, neutra): los hechos del producto. Se busca en la web oficial del fabricante (o fuente equivalente) y se redacta de forma neutra, sin intentar sonar a nadie. Jesús supervisa y edita esta parte, pero el punto de partida es siempre una fuente externa verificable, no una ocurrencia.
- **Subtitular** (campo `Subtitular` en Notion, voz): la frase personal. Aquí vive la voz de Jesús — una opinión, una anécdota, un hábito real. La escribe siempre él mismo, nunca Claude. Si el campo está vacío, la ficha simplemente no muestra subtitular (no se rellena con un intento automático).

Por qué separarlo así: mezclarlos en un único campo obligaba a partir la descripción con una regex para fingir un "dek" — funcionaba mal en la práctica (en fichas donde la frase técnica va primero, como cámaras o auriculares, la regex destacaba en cursiva justo la frase más aburrida). Separar los campos también evita el problema de fondo: las descripciones que había en Notion antes de este documento **no eran de Jesús** — las había escrito Claude en una sesión anterior como placeholder, y no sirven como referencia de voz de nadie.

## De dónde sale cada parte

**Descripción (neutra):** Claude busca la ficha oficial del producto (web del fabricante, o la fuente más fiable disponible) y redacta un par de frases neutras a partir de ahí. Ejemplo verificado contra aeropress.com (AeroPress Go):

> Presión manual, café sin amargor en 2 minutos y todo el kit (émbolo, filtros y cuchara) encaja dentro de su propia taza. Mochila, oficina o camping: buen café sin prisas ni enchufes.

**Subtitular (voz):** lo escribe Jesús. Primer ejemplo real (AeroPress Go):

> El momento del café es el mejor momento del día y no se hable más, yo hace tiempo que no salgo de casa sin mi Go.

## Referencia de voz existente: Nada importa

En `Nada importa/Redes sociales/CONTEXTO.md` ya hay un documento real (no inventado) sobre la voz de Jesús, construido a partir de las cartas, las columnas y las 822 respuestas del Consultorio. Lo relevante para las fichas de producto — las **constantes**, las que no dependen del formato:

- Empieza en un detalle físico o momento concreto, nunca en la categoría genérica del producto.
- Ritmo largo + corto: la frase larga acumula, la corta corta.
- El cierre se queda puesto — no se explica, no lleva moraleja.
- Se evita: vocabulario de autoayuda ("sanar", "empoderar", "resiliencia"), CTA forzado, listas numeradas de consejos.

Lo que ese documento **no cubre**: está construido sobre material largo (cartas, ensayos, aforismos de una línea). No hay ahí ni un ejemplo de cómo suena Jesús describiendo un objeto en una sola frase corta para que alguien lo compre — ese es un formato nuevo, y las reglas específicas de ese formato solo pueden salir de ejemplos reales suyos, no de extrapolar el documento largo.

## Primeras observaciones del formato corto (subtitular)

Sacadas del único ejemplo real que tenemos hasta ahora (AeroPress Go) — a confirmar o corregir con más muestras:

- Cierre hablado, no literario: "y no se hable más" corta la conversación en plan de bar, no en plan de ensayo — es la misma idea de "el cierre se queda puesto" pero en registro oral.
- Posesión personal: dice "mi Go", no "el AeroPress" ni "esta cafetera" — firma el objeto como propio en vez de recomendarlo desde fuera.

Hace falta más de un ejemplo para saber cuáles de estos patrones se repiten y cuáles son solo de esta ficha.

## Estado técnico

- Tipo `Product` (`src/lib/types.ts`): campo `subtitle?: string` añadido.
- Notion (`src/lib/notion.ts`): se lee la propiedad `Subtitular` (rich text) de la base de datos de productos.
- Ficha de producto (`src/app/productos/[slug]/page.tsx`): si `product.subtitle` existe, se muestra en serif cursiva encima de la descripción neutra; si no existe, no se muestra nada (sin relleno automático).
- Base de datos de Notion: propiedad `Subtitular` (rich text) ya creada. Solo tiene contenido en AeroPress Go pendiente de que Jesús la escriba directamente en Notion.

## Siguiente paso

Ir rellenando `Subtitular` producto a producto (Jesús escribe la frase en Notion), y revisar `Descripción` producto a producto (Claude propone la neutra desde la fuente oficial, Jesús la supervisa). Cuando haya 4-5 subtitulares reales, revisar esta sección de "primeras observaciones" y convertirla en reglas más firmes.
