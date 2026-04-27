const TAG = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG ?? "";

export function buildAffiliateUrl(asin: string, market = "es"): string {
  return `https://www.amazon.${market}/dp/${asin}?tag=${TAG}&linkCode=as2`;
}
