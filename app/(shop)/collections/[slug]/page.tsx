import type { Metadata } from "next";
import CollectionClient from "@/components/products/CollectionClient";
import { getCategories } from "@/lib/actions/category.action";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c: any) => c.slug === slug);
  const name = cat ? cat.name : slug;

  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} | Ketchupp Store`,
    description: `Explore our premium collection of ${name}. High-quality streetwear and signature pieces from Ketchupp.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  return <CollectionClient categorySlug={slug} />;
}
