export async function fetchAmazonImage(asin: string, market = "es"): Promise<string> {
  try {
    const res = await fetch(`https://www.amazon.${market}/dp/${asin}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "es-ES,es;q=0.9",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 86400 },
    });

    const html = await res.text();

    // Try og:image first
    const ogMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
    if (ogMatch?.[1]) return ogMatch[1];

    // Fallback: hiRes image in JSON data
    const hiResMatch = html.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
    if (hiResMatch?.[1]) return hiResMatch[1];

    // Fallback: main product image
    const imgMatch = html.match(/id="landingImage"[^>]+src="([^"]+)"/);
    if (imgMatch?.[1]) return imgMatch[1];

    return "";
  } catch {
    return "";
  }
}
