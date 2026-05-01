"use client";
import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavourites } from "@/context/FavouritesContext";
import ProductCard from "@/components/products/ProductCard";

export default function FavouritesPage() {
  const { favourites } = useFavourites();

  if (favourites.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-[#DDD8CE] text-center shadow-sm">
        <div className="w-20 h-20 bg-[#EDE8E0] rounded-full flex items-center justify-center mx-auto mb-5">
          <Heart className="w-10 h-10 text-[#8B8580]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>No saved items</h2>
        <p className="text-[#8B8580] mb-6">Items you favourite will appear here for easy access.</p>
        <Link href="/products" className="inline-flex px-6 py-3 bg-[#1A1A1A] text-white rounded-xl font-bold hover:bg-[#333] transition-colors">
          Explore Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-4 mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-playfair)" }}>
          Saved Favourites
        </h2>
        <span className="text-sm font-semibold bg-[#EDE8E0] px-3 py-1 rounded-full text-[#8B8580]">
          {favourites.length} {favourites.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {favourites.map((fav) => (
          <ProductCard key={fav.id} product={{ ...fav, category: "saved" }} />
        ))}
      </div>
    </div>
  );
}
