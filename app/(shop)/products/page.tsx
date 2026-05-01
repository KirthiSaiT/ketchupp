import type { Metadata } from "next";
import CollectionClient from "@/components/products/CollectionClient";

interface Props {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const cat = params.category;
  return {
    title: cat ? `${cat.charAt(0).toUpperCase() + cat.slice(1)} | Ketchupp Store` : "Shop All Collections | Ketchupp Store",
    description: "Shop the full Ketchupp collection. Premium streetwear, limited drops, and timeless staples for the modern archive.",
    keywords: ["streetwear", "fashion", "ketchupp clothing", "premium apparel"],
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <CollectionClient
      categorySlug={params.category}
      initialSearch={params.search}
    />
  );
}
