"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Plus, ShoppingBag, Heart, Star, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  image: string;
  images?: string[];
  category: string;
  badge?: string | null;
  colors?: string[];
  sizes?: { name: string; stock: number }[];
  rating?: number;
  reviewCount?: number;
  createdAt?: string | Date;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quickOpen, setQuickOpen] = useState(false);
  const [isWished, setIsWished] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0]?.name ?? null
  );

  function handleAddToCart(e?: React.MouseEvent) {
    e?.stopPropagation();
    if (!selectedSize && product.sizes?.length) {
      toast.error("Please select a size");
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize ?? "Free Size",
      color: product.colors?.[0] ?? "",
      quantity: 1,
      slug: product.slug,
    });
    toast.success(`${product.name} added to bag!`);
    setQuickOpen(false);
  }

  return (
    <>
      <div className="group relative flex flex-col bg-transparent">
        {/* Image Experience */}
        <div className="relative aspect-[3/4.5] rounded-[2rem] overflow-hidden bg-brand-charcoal/5 group cursor-pointer">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </Link>
          
          {/* Glass Badges */}
          {product.badge && (
            <div className="absolute top-6 left-6 z-10">
              <span className="px-4 py-1.5 rounded-full bg-brand-yellow/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-brand-charcoal border border-white/20">
                {product.badge}
              </span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-6 right-6 z-10 flex flex-col gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
             <button
               onClick={() => setIsWished(!isWished)}
               className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 active:scale-90"
             >
               <Heart className={cn("w-4 h-4 transition-colors", isWished ? "fill-brand-red text-brand-red" : "text-white")} />
             </button>
             <button
               onClick={() => setQuickOpen(true)}
               className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 active:scale-90"
             >
               <Eye className="w-4 h-4 text-white" />
             </button>
          </div>

          {/* Hover Overlay Button */}
          <div className="absolute bottom-8 left-0 w-full px-8 transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
             <Button 
               onClick={() => setQuickOpen(true)}
               className="w-full h-14 rounded-2xl bg-white text-brand-charcoal font-bold uppercase tracking-widest text-[10px] hover:bg-brand-yellow transition-all border-none shadow-2xl shadow-black/10"
             >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Select Options
             </Button>
          </div>
        </div>

        {/* Info Area */}
        <div className="mt-8 px-2 flex flex-col items-center text-center">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-[13px] font-black text-brand-charcoal uppercase tracking-widest hover:text-brand-red transition-colors mb-2 truncate w-full">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-lg font-black text-brand-charcoal">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-brand-muted line-through font-bold">
                ₹{product.comparePrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal - Premium Experience */}
      <Dialog open={quickOpen} onOpenChange={setQuickOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-brand-cream rounded-[3rem] shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="relative aspect-square md:w-1/2 bg-brand-charcoal/5">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
              {product.badge && (
                <div className="absolute top-8 left-8 z-10">
                  <span className="px-5 py-2 rounded-full bg-brand-yellow text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Content Side */}
            <div className="flex-1 p-12 md:p-16 flex flex-col justify-center bg-white">
               <div className="mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-4 block">
                    Product Details
                  </span>
                  <h2 className="text-4xl font-black text-brand-charcoal uppercase tracking-tighter leading-none mb-6">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-4">
                     <p className="text-2xl font-black text-brand-charcoal">₹{product.price.toLocaleString("en-IN")}</p>
                     <div className="flex items-center gap-1 bg-brand-yellow/10 px-3 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-brand-yellow text-brand-yellow" />
                        <span className="text-[10px] font-black text-brand-charcoal">4.9 / 5.0</span>
                     </div>
                  </div>
               </div>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-12">
                  <p className="text-[10px] uppercase font-black tracking-[0.3em] text-brand-charcoal/30 mb-6">Select Your Fit</p>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => setSelectedSize(s.name)}
                        disabled={s.stock === 0}
                        className={cn(
                          "w-14 h-14 flex items-center justify-center text-xs font-black rounded-2xl border transition-all",
                          selectedSize === s.name
                            ? "bg-brand-charcoal text-white border-brand-charcoal shadow-xl"
                            : "border-brand-charcoal/10 text-brand-charcoal hover:border-brand-charcoal"
                        )}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-4">
                 <Button
                    onClick={handleAddToCart}
                    className="w-full h-16 bg-brand-red hover:bg-brand-red/90 text-white rounded-2xl text-[11px] font-black tracking-widest uppercase border-none shadow-2xl shadow-brand-red/20 transition-all active:scale-95"
                 >
                    Add to Archive Bag
                 </Button>
                 <Link href={`/products/${product.slug}`} className="w-full">
                    <Button variant="outline" className="w-full h-16 rounded-2xl border-brand-charcoal/10 text-brand-charcoal font-black text-[11px] uppercase tracking-widest hover:bg-brand-charcoal hover:text-white">
                       View Full Story
                    </Button>
                 </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
