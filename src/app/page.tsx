import { getStaffPicks } from "@/lib/products";
import { getAllCollections } from "@/lib/collections";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";

export const revalidate = 60;

export default async function HomePage() {
  const staffPicks = await getStaffPicks(6);
  const collections = getAllCollections();

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={staffPicks} />
      <FeaturedCollections collections={collections} />
    </>
  );
}
