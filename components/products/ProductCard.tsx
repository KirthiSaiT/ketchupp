"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag, Heart, Star, X, ChevronLeft, ChevronRight, Tag, Zap } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Product {
  _id?: string;
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
    product.sizes?.find(s => s.stock > 0)?.name ?? null
  );
  const allImages = product.images?.length ? product.images : (product.image ? [product.image] : ["/images/placeholder.webp"]);
  const mainImage = allImages[0];
  const [activeImg, setActiveImg] = useState(0);

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  function handleAddToCart(e?: React.MouseEvent) {
    e?.stopPropagation();
    if (!selectedSize && product.sizes?.length) {
      toast.error("Please select a size");
      return;
    }
    const selectedSizeData = product.sizes?.find(s => s.name === selectedSize);
    
    const success = addItem({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: mainImage,
      size: selectedSize ?? "Free Size",
      color: product.colors?.[0] ?? "",
      quantity: 1,
      slug: product.slug,
      maxStock: selectedSizeData?.stock ?? 99,
    });

    if (success) {
      toast.success(`${product.name} added to bag!`);
      setQuickOpen(false);
    }
  }

  return (
    <>
      {/* ─── Product Card ─── */}
      <div className="group relative flex flex-col bg-transparent">
        <div className="relative aspect-[3/4.5] rounded-[2rem] overflow-hidden bg-brand-charcoal/5 cursor-pointer">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={mainImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              quality={85}
            />
          </Link>

          {product.badge && (
            <div className="absolute top-6 left-6 z-10">
              <span className="px-4 py-1.5 rounded-full bg-brand-yellow/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-brand-charcoal border border-white/20">
                {product.badge}
              </span>
            </div>
          )}

          <div className="absolute top-6 right-6 z-10 flex flex-col gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <button
              onClick={() => setIsWished(!isWished)}
              className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 active:scale-90"
            >
              <Heart className={cn("w-4 h-4 transition-colors", isWished ? "fill-brand-red text-brand-red" : "text-white")} />
            </button>
            <button
              onClick={() => { setActiveImg(0); setQuickOpen(true); }}
              className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 active:scale-90"
            >
              <Eye className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="absolute bottom-8 left-0 w-full px-8 transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              onClick={() => { setActiveImg(0); setQuickOpen(true); }}
              className="w-full h-14 rounded-2xl bg-white text-brand-charcoal font-bold uppercase tracking-widest text-[10px] hover:bg-brand-yellow transition-all border-none shadow-2xl shadow-black/10"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Select Options
            </Button>
          </div>
        </div>

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

      {/* ─── Premium Quick View Modal ─── */}
      <Dialog open={quickOpen} onOpenChange={setQuickOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[95vw] max-w-5xl sm:max-w-5xl md:max-w-5xl lg:max-w-5xl p-0 overflow-hidden border-none bg-transparent rounded-[2rem] shadow-2xl gap-0"
        >
          <div className="flex flex-col lg:flex-row max-h-[90vh] rounded-[2rem] overflow-hidden bg-[#FAF7F2]">

            {/* Left: Image Panel */}
            <div className="relative lg:w-[55%] bg-[#111] flex-shrink-0 min-h-[300px] lg:min-h-[580px]">
              <div className="relative w-full h-full min-h-[300px] lg:min-h-[580px]">
                <Image
                  src={allImages[activeImg]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-opacity duration-300"
                  priority
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent pointer-events-none" />
              </div>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-4 py-1.5 rounded-full bg-brand-yellow text-[9px] font-black uppercase tracking-widest text-brand-charcoal shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Discount chip */}
              {discount && (
                <div className="absolute top-5 right-14 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-brand-red text-[9px] font-black uppercase tracking-widest text-white shadow-lg flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {discount}% OFF
                  </span>
                </div>
              )}

              {/* Close — mobile */}
              <button
                onClick={() => setQuickOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/50 transition-all z-30 lg:hidden"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Arrow navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg(i => (i - 1 + allImages.length) % allImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all z-20"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => setActiveImg(i => (i + 1) % allImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all z-20"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </>
              )}

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20 px-4">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={cn(
                        "relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0",
                        activeImg === i
                          ? "border-brand-yellow scale-110 shadow-lg shadow-black/30"
                          : "border-white/30 opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image 
                        src={img} 
                        alt={`View ${i + 1}`} 
                        fill 
                        sizes="48px"
                        className="object-cover" 
                        quality={50}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info Panel */}
            <div className="flex-1 bg-[#FAF7F2] flex flex-col overflow-y-auto">
              {/* Close — desktop */}
              <div className="hidden lg:flex justify-end p-5 pb-0">
                <button
                  onClick={() => setQuickOpen(false)}
                  className="w-9 h-9 rounded-full bg-brand-charcoal/8 hover:bg-brand-charcoal/15 flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4 text-brand-charcoal" />
                </button>
              </div>

              <div className="flex-1 px-8 lg:px-10 pt-6 lg:pt-4 pb-8 flex flex-col gap-5">
                {/* Category */}
                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-brand-red">
                  {product.category}
                </span>

                {/* Name */}
                <h2
                  className="text-2xl lg:text-[1.75rem] font-black text-brand-charcoal uppercase tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {product.name}
                </h2>

                {/* Price row */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-2xl font-black text-brand-charcoal">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.comparePrice && (
                    <>
                      <span className="text-base text-brand-muted line-through font-semibold">
                        ₹{product.comparePrice.toLocaleString("en-IN")}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest">
                        Save ₹{(product.comparePrice - product.price).toLocaleString("en-IN")}
                      </span>
                    </>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3.5 h-3.5",
                          i <= Math.round(product.rating ?? 4.5)
                            ? "fill-brand-yellow text-brand-yellow"
                            : "text-brand-charcoal/20"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-brand-muted">
                    {product.rating?.toFixed(1) ?? "4.5"} &nbsp;·&nbsp; {product.reviewCount ?? 0} reviews
                  </span>
                </div>

                <div className="h-px bg-brand-charcoal/8" />

                {/* Size picker */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] uppercase font-black tracking-[0.3em] text-brand-charcoal/40">
                        Select Size
                      </p>
                      <span className="text-[10px] font-bold text-brand-red underline underline-offset-2 cursor-pointer">
                        Size Guide
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => {
                        const outOfStock = s.stock === 0;
                        const isSelected = selectedSize === s.name;
                        return (
                          <button
                            key={s.name}
                            onClick={() => !outOfStock && setSelectedSize(s.name)}
                            disabled={outOfStock}
                            title={outOfStock ? "Out of stock" : `${s.stock} left`}
                            className={cn(
                              "relative w-14 h-12 flex flex-col items-center justify-center text-[11px] font-black rounded-xl border-2 transition-all",
                              isSelected
                                ? "bg-brand-charcoal text-white border-brand-charcoal shadow-lg shadow-brand-charcoal/20"
                                : outOfStock
                                ? "border-brand-charcoal/10 text-brand-charcoal/25 cursor-not-allowed"
                                : "border-brand-charcoal/15 text-brand-charcoal hover:border-brand-charcoal bg-white"
                            )}
                          >
                            {s.name}
                            {outOfStock && (
                              <span className="text-[7px] font-bold text-brand-charcoal/25 leading-none mt-0.5">
                                sold out
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Low stock warning */}
                {(() => {
                  const sel = product.sizes?.find(s => s.name === selectedSize);
                  if (sel && sel.stock > 0 && sel.stock <= 3) {
                    return (
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 border border-orange-200">
                        <Zap className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                        <span className="text-[11px] font-bold text-orange-600">
                          Only {sel.stock} left in this size — grab it fast!
                        </span>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* CTAs */}
                <div className="flex flex-col gap-3 mt-auto pt-2">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full h-14 bg-brand-red hover:bg-brand-red/90 text-white rounded-2xl text-[11px] font-black tracking-widest uppercase border-none shadow-xl shadow-brand-red/20 transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Bag
                  </Button>
                  <Link href={`/products/${product.slug}`} className="w-full" onClick={() => setQuickOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-2xl border-brand-charcoal/15 text-brand-charcoal font-black text-[11px] uppercase tracking-widest hover:bg-brand-charcoal hover:text-white transition-all"
                    >
                      View Full Details →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
