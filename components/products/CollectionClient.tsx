"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, Filter, X, ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard, { Product } from "@/components/products/ProductCard";
import { getAllProducts } from "@/lib/actions/product.action";
import { getCategories } from "@/lib/actions/category.action";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CollectionClientProps {
  categorySlug?: string;
  initialSearch?: string;
}

export default function CollectionClient({ categorySlug, initialSearch }: CollectionClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [activeCategory, setActiveCategory] = useState(categorySlug || "all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const [pData, cData] = await Promise.all([
        getAllProducts(),
        getCategories()
      ]);
      setProducts(pData);
      setCategories(cData);
      setLoading(false);
    }
    init();
  }, []);

  useEffect(() => {
    if (categorySlug) setActiveCategory(categorySlug);
  }, [categorySlug]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (activeCategory !== "all") {
      list = list.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Price Filter
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      list = list.filter(p => p.price >= min && (max ? p.price <= max : true));
    }

    // Search
    if (initialSearch) {
      list = list.filter(p => p.name.toLowerCase().includes(initialSearch.toLowerCase()));
    }

    // Sort
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());

    return list;
  }, [products, activeCategory, priceRange, initialSearch, sortBy]);

  const currentCategory = categories.find(c => c.slug === activeCategory);
  const categoryTitle = currentCategory?.name || (activeCategory === "all" ? "The Archive" : activeCategory);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* ── Header Experience ── */}
      <section className="relative h-[60vh] flex flex-col justify-end pb-24 overflow-hidden bg-brand-charcoal">
        {/* Background Image / Ambient Glow */}
        <div className="absolute inset-0 z-0">
          {currentCategory?.image ? (
             <img src={currentCategory.image} alt={categoryTitle} className="w-full h-full object-cover opacity-40 grayscale" />
          ) : (
            <div className="w-full h-full bg-brand-charcoal" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent" />
          <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-brand-red/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 w-full">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-6 block">
                Archival Collection
              </span>
              <h1 className="text-7xl lg:text-9xl font-black text-white leading-none tracking-tighter uppercase">
                 {categoryTitle.split(' ').map((word, i) => (
                    <span key={i} className="block">
                      {word === "Archive" ? <span className="text-brand-red italic font-serif">{word}</span> : word}
                    </span>
                 ))}
              </h1>
              <div className="flex items-center gap-6 mt-12">
                 <div className="h-[1px] w-24 bg-white/20" />
                 <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">
                    {filteredProducts.length} Items Discovered
                 </p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* ── Toolbar / Filter Experience ── */}
      <div className="sticky top-20 z-40 bg-brand-cream/80 backdrop-blur-xl border-y border-brand-charcoal/5">
         <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
               <button 
                 onClick={() => setIsFilterOpen(!isFilterOpen)}
                 className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-brand-charcoal hover:text-brand-red transition-colors"
               >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filter Archive
               </button>
               
               <div className="hidden md:flex items-center gap-2">
                  {categories.slice(0, 5).map(c => (
                    <button 
                      key={c._id}
                      onClick={() => setActiveCategory(c.slug)}
                      className={cn(
                        "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                        activeCategory === c.slug 
                          ? "bg-brand-charcoal text-white" 
                          : "text-brand-charcoal/40 hover:text-brand-charcoal"
                      )}
                    >
                      {c.name}
                    </button>
                  ))}
               </div>
            </div>

            <div className="flex items-center gap-8">
               <div className="hidden lg:flex items-center gap-6">
                  {["Price Low-High", "Price High-Low", "Newest First"].map((s, i) => (
                    <button 
                      key={s}
                      onClick={() => setSortBy(i === 0 ? "price-asc" : i === 1 ? "price-desc" : "newest")}
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-widest transition-colors",
                        (sortBy === "price-asc" && i === 0) || (sortBy === "price-desc" && i === 1) || (sortBy === "newest" && i === 2)
                          ? "text-brand-red" 
                          : "text-brand-charcoal/30 hover:text-brand-charcoal"
                      )}
                    >
                      {s}
                    </button>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* ── Products Grid Experience ── */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
         {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
               {[1,2,3,4,5,6,7,8].map(i => (
                 <div key={i} className="aspect-[3/4] bg-brand-charcoal/5 rounded-3xl animate-pulse" />
               ))}
            </div>
         ) : filteredProducts.length === 0 ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
               <X className="w-12 h-12 text-brand-charcoal/10 mb-6" />
               <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-charcoal/40">
                  No artifacts found in this collection.
               </p>
               <Button 
                 onClick={() => { setActiveCategory("all"); setPriceRange("all"); }}
                 variant="link" 
                 className="mt-4 text-brand-red uppercase tracking-widest text-[10px] font-black"
               >
                  Reset All Filters
               </Button>
            </div>
         ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
               {filteredProducts.map((p, i) => (
                 <motion.div
                   key={p.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: (i % 4) * 0.1 }}
                 >
                    <ProductCard product={p} />
                 </motion.div>
               ))}
            </div>
         )}
      </section>

      {/* ── Mobile Filter Drawer (Conceptual) ── */}
      <AnimatePresence>
         {isFilterOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[100] shadow-2xl p-12"
            >
               <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)}>
                     <X className="w-6 h-6" />
                  </button>
               </div>
               
               <div className="space-y-12">
                  <div>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-charcoal/30 mb-6 block">Categories</span>
                     <div className="flex flex-wrap gap-3">
                        {categories.map(c => (
                          <button 
                            key={c._id}
                            onClick={() => setActiveCategory(c.slug)}
                            className={cn(
                              "px-5 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest border transition-all",
                              activeCategory === c.slug 
                                ? "bg-brand-charcoal text-white border-brand-charcoal" 
                                : "border-brand-charcoal/10 text-brand-charcoal/60 hover:border-brand-charcoal"
                            )}
                          >
                            {c.name}
                          </button>
                        ))}
                     </div>
                  </div>

                  <div>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-charcoal/30 mb-6 block">Price Point</span>
                     <div className="grid grid-cols-2 gap-4">
                        {[
                          { l: "Any Price", v: "all" },
                          { l: "Under ₹1,500", v: "0-1500" },
                          { l: "₹1,500 - ₹3,500", v: "1500-3500" },
                          { l: "₹3,500+", v: "3500-10000" },
                        ].map(r => (
                          <button 
                            key={r.v}
                            onClick={() => setPriceRange(r.v)}
                            className={cn(
                              "px-5 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all text-left",
                              priceRange === r.v 
                                ? "bg-brand-red text-white border-brand-red" 
                                : "border-brand-charcoal/10 text-brand-charcoal/60 hover:border-brand-charcoal"
                            )}
                          >
                            {r.l}
                          </button>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-12 left-12 right-12">
                  <Button 
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full h-16 rounded-2xl bg-brand-charcoal text-white font-black uppercase tracking-widest"
                  >
                     Show {filteredProducts.length} Results
                  </Button>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
