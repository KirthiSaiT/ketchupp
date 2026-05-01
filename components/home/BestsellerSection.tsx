"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  badge?: string;
}

interface BestsellerSectionProps {
  products: Product[];
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWished, setIsWished] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-none w-[320px] group cursor-pointer"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-brand-muted/10">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ease-out ${isHovered ? "scale-110" : "scale-100"}`}
          />
          
          {/* Glass Badges */}
          {product.badge && (
            <div className="absolute top-6 left-6 z-10">
              <span className="px-4 py-1.5 rounded-full bg-brand-yellow/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-brand-charcoal border border-white/20">
                {product.badge}
              </span>
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWished(!isWished);
            }}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 active:scale-90"
          >
            <Heart className={`w-5 h-5 transition-colors ${isWished ? "fill-brand-red text-brand-red" : "text-white"}`} />
          </button>

          {/* Hover Overlay Button */}
          <div className={`absolute bottom-8 left-0 w-full px-8 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
             <Button className="w-full h-14 rounded-2xl bg-white text-brand-charcoal font-bold uppercase tracking-widest text-xs hover:bg-brand-yellow transition-colors border-none">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Quick Add
             </Button>
          </div>
        </div>

        <div className="mt-8 px-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-brand-charcoal tracking-tight group-hover:text-brand-red transition-colors truncate pr-4">
              {product.name}
            </h3>
            <div className="flex items-center gap-1">
               <Star className="w-3 h-3 fill-brand-yellow text-brand-yellow" />
               <span className="text-xs font-bold text-brand-muted">4.9</span>
            </div>
          </div>
          <p className="text-xl font-black text-brand-charcoal">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BestsellerSection({ products }: BestsellerSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-6 block"
            >
              The Essentials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl lg:text-7xl font-black text-brand-charcoal leading-none"
            >
              Curated <span className="text-brand-red italic font-serif">Hits</span>
            </motion.h2>
          </div>
          
          <Link href="/products" className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-muted hover:text-brand-red transition-colors group">
            Explore All
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide -mx-6 px-6 snap-x">
          {products.map((p, i) => (
            <div key={p._id} className="snap-start">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="h-[2px] w-full bg-brand-muted/10 rounded-full mt-4 overflow-hidden relative">
           <motion.div 
             className="absolute h-full bg-brand-red rounded-full"
             initial={{ width: "20%" }}
             whileInView={{ width: "60%" }}
             transition={{ duration: 1 }}
           />
        </div>
      </div>
    </section>
  );
}
