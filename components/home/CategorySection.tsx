"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface CategorySectionProps {
  categories: Category[];
}

function CategoryCard({ category, index, className, titleSize = "text-3xl" }: { category: Category, index: number, className?: string, titleSize?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={cn("relative group overflow-hidden rounded-[2.5rem] bg-brand-charcoal/5 h-full w-full", className)}
    >
      <Link href={`/collections/${category.slug}`} className="block h-full w-full">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale hover:grayscale-0"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Metadata */}
          <div className="absolute top-6 left-6 z-20">
             <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">
                PHASE_0{index + 1}
             </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-8 left-8 z-20">
             <h3 className={cn("font-black text-white leading-none tracking-tighter uppercase mb-2", titleSize)}>
                {category.name}
             </h3>
             <div className="h-[1px] w-0 group-hover:w-12 bg-brand-yellow transition-all duration-500" />
          </div>

          <div className="absolute bottom-8 right-8 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
             <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-brand-charcoal">
                <ArrowUpRight className="w-5 h-5" />
             </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategorySection({ categories }: CategorySectionProps) {
  if (!categories || categories.length === 0) return null;

  // We take exactly 5 categories for this specific layout
  const displayCats = categories.slice(0, 5);
  
  return (
    <section className="py-32 bg-brand-cream overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-red mb-6 block"
          >
            The Archive
          </motion.span>
          <h2 className="text-5xl lg:text-7xl font-black text-brand-charcoal tracking-tighter uppercase leading-none">
            Explore <span className="text-brand-red italic font-serif">Collections</span>
          </h2>
        </div>

        {/* Unified 5-Card Grid (Forms one big "Card" structure) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[800px]">
           
           {/* Column 1: The Main Hero (Left Side) */}
           <div className="lg:col-span-7 h-[500px] lg:h-full">
              <CategoryCard 
                category={displayCats[0]} 
                index={0} 
                titleSize="text-5xl lg:text-7xl"
              />
           </div>

           {/* Column 2: The 2x2 Grid (Right Side) */}
           <div className="lg:col-span-5 grid grid-cols-2 gap-6 h-[600px] lg:h-full">
              {displayCats.slice(1, 5).map((cat, i) => (
                <CategoryCard 
                  key={cat._id} 
                  category={cat} 
                  index={i + 1} 
                  titleSize="text-2xl lg:text-3xl"
                />
              ))}
           </div>

        </div>
      </div>
    </section>
  );
}
