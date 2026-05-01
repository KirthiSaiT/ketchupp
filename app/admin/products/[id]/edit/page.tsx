import React from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/actions/product.action";
import EditProductForm from "@/components/admin/EditProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <EditProductForm product={product} />
    </div>
  );
}
