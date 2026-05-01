"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package2, Search, SlidersHorizontal } from "lucide-react";
import ProductCard, { Product } from "@/components/products/ProductCard";
import { getAllProducts } from "@/lib/actions/product.action";
import { getCategories } from "@/lib/actions/category.action";

interface ProductsClientProps {
  categoryFilter?: string;
  searchQuery?: string;
}

export default function ProductsClient({ categoryFilter, searchQuery }: ProductsClientProps) {
  const [serverProducts, setServerProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [localSearch, setLocalSearch] = useState(searchQuery ?? "");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [dbCategories, setDbCategories] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAllProducts().then(res => setServerProducts(res)),
      getCategories().then(res => setDbCategories(res))
    ]).finally(() => setLoading(false));
  }, []);

  // Set initial tab from URL categoryFilter
  useEffect(() => {
    if (categoryFilter && categoryFilter !== "all") {
      setActiveTab(categoryFilter);
    }
  }, [categoryFilter]);

  // Dynamically extract unique categories from DB
  const categories = useMemo(() => {
    const cats = dbCategories.map(c => c.slug);
    return ["all", ...cats];
  }, [dbCategories]);

  // Filter + sort
  const displayedProducts = useMemo(() => {
    let list = [...serverProducts];

    if (activeTab !== "all") {
      list = list.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());
    }

    const q = localSearch.toLowerCase().trim();
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());

    return list;
  }, [serverProducts, activeTab, localSearch, sortBy]);

  const pageTitle = activeTab === "all"
    ? "All Products"
    : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* ── Hero Header ── */}
      <div className="bg-[#1A1A1A] pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#C1121F] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FFD60A] mb-3">
            Ketchupp Store
          </p>
          <h1
            className="text-5xl lg:text-7xl font-black text-[#FAF7F2] leading-none mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {pageTitle}
          </h1>
          <p className="text-[#8B8580] text-sm">
            {loading ? "Loading..." : `${displayedProducts.length} item${displayedProducts.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {/* ── Sticky Controls Bar ── */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#DDD8CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Animated Category Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-8 w-20 rounded-full bg-[#DDD8CE] animate-pulse flex-none" />
                  ))
                : categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveTab(cat)}
                      className="relative flex-none px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 whitespace-nowrap"
                      style={{
                        color: activeTab === cat ? "#FAF7F2" : "#8B8580",
                        zIndex: 1,
                      }}
                    >
                      {activeTab === cat && (
                        <motion.div
                          layoutId="activeTabPill"
                          className="absolute inset-0 bg-[#C1121F] rounded-full"
                          style={{ zIndex: -1 }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {cat === "all" ? "All" : (dbCategories.find(c => c.slug === cat)?.name || cat.charAt(0).toUpperCase() + cat.slice(1))}
                    </button>
                  ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 flex-none">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B8580]" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-9 pr-3 py-1.5 text-xs bg-white border border-[#DDD8CE] rounded-full text-[#1A1A1A] placeholder:text-[#8B8580] focus:outline-none focus:border-[#C1121F] w-36 transition-colors"
                />
              </div>

              {/* Sort */}
              <div className="relative flex items-center gap-1.5 border border-[#DDD8CE] bg-white rounded-full px-3 py-1.5 text-xs text-[#8B8580] cursor-pointer">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none text-xs text-[#1A1A1A] cursor-pointer pr-1"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Products Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="h-72 bg-[#DDD8CE] animate-pulse rounded-2xl" />
                <div className="mt-3 h-4 bg-[#DDD8CE] animate-pulse rounded w-3/4" />
                <div className="mt-2 h-4 bg-[#DDD8CE] animate-pulse rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <Package2 className="w-20 h-20 text-[#DDD8CE] mb-5" />
            <h3
              className="text-2xl font-bold text-[#1A1A1A] mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Nothing here yet.
            </h3>
            <p className="text-[#8B8580] text-sm max-w-xs">
              {activeTab !== "all"
                ? `No products in "${activeTab}" yet. Add some from the Admin Dashboard.`
                : "No products in the store. Add some from the Admin Dashboard."}
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {displayedProducts.map(p => (
                <motion.div
                  key={p.id ?? (p as any)._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
