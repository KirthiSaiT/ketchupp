"use client";
import React, { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard, { Product } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#C1121F" },
  { name: "Yellow", hex: "#FFD60A" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Olive", hex: "#5A5C3A" },
  { name: "Beige", hex: "#C8B899" },
  { name: "Grey", hex: "#9CA3AF" },
];

interface FilterSidebarProps {
  products: Product[];
  category: string;
  onFilteredChange: (filtered: Product[]) => void;
}

export default function FilterSidebar({
  products,
  category,
  onFilteredChange,
}: FilterSidebarProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sort, setSort] = useState("newest");
  const [mobileOpen, setMobileOpen] = useState(false);

  const maxPrice = useMemo(
    () => Math.max(...products.map((p) => p.price), 10000),
    [products]
  );

  const filtered = useMemo(() => {
    let res = [...products];
    if (selectedSizes.length > 0) {
      res = res.filter((p) =>
        p.sizes?.some((s) => selectedSizes.includes(s.name))
      );
    }
    if (selectedColors.length > 0) {
      res = res.filter((p) =>
        p.colors?.some((c) => selectedColors.some((sc) =>
          c.toLowerCase().includes(sc.toLowerCase())
        ))
      );
    }
    res = res.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case "price-asc": res.sort((a, b) => a.price - b.price); break;
      case "price-desc": res.sort((a, b) => b.price - a.price); break;
      case "name-asc": res.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return res;
  }, [products, selectedSizes, selectedColors, priceRange, sort]);

  React.useEffect(() => { onFilteredChange(filtered); }, [filtered, onFilteredChange]);

  function toggleSize(s: string) {
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }
  function toggleColor(c: string) {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  const activeCount = selectedSizes.length + selectedColors.length + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0);

  function clearAll() {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, maxPrice]);
  }

  const SidebarContent = () => (
    <div className="space-y-7">
      {/* Sort */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-[#8B8580] block mb-3">
          Sort By
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-3 py-2.5 bg-[#EDE8E0] rounded-xl text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C1121F]"
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Alphabetical A–Z</option>
        </select>
      </div>

      {/* Sizes */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-[#8B8580] block mb-3">
          Size
        </label>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                selectedSizes.includes(s)
                  ? "bg-[#1A1A1A] text-[#FAF7F2] border-[#1A1A1A]"
                  : "border-[#DDD8CE] text-[#1A1A1A] hover:border-[#1A1A1A]"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-[#8B8580] block mb-3">
          Price Range
        </label>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full accent-[#C1121F]"
          />
          <div className="flex justify-between text-sm font-semibold text-[#1A1A1A]">
            <span>₹0</span>
            <span>≤ ₹{priceRange[1].toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-[#8B8580] block mb-3">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleColor(c.name)}
              title={c.name}
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                selectedColors.includes(c.name)
                  ? "border-[#C1121F] scale-110"
                  : "border-[#DDD8CE]"
              )}
              style={{ background: c.hex }}
              aria-label={c.name}
            />
          ))}
        </div>
      </div>

      {activeCount > 0 && (
        <Button
          variant="outline"
          onClick={clearAll}
          className="w-full rounded-xl border-[#DDD8CE] text-[#8B8580] hover:text-[#C1121F]"
        >
          Clear Filters ({activeCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setMobileOpen(!mobileOpen)}
          variant="outline"
          className="flex items-center gap-2 rounded-xl border-[#DDD8CE]"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <Badge className="bg-[#C1121F] text-white text-[10px] px-1.5 rounded-full">
              {activeCount}
            </Badge>
          )}
          {mobileOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
        {mobileOpen && (
          <div className="mt-4 p-5 bg-white rounded-2xl border border-[#DDD8CE] animate-slide-up">
            <SidebarContent />
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-none">
        <div className="sticky top-24 bg-white rounded-2xl p-5 border border-[#DDD8CE]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[#1A1A1A] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#C1121F]" />
              Filters
            </h3>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="text-[10px] font-bold uppercase text-[#C1121F] hover:underline flex items-center gap-1"
              >
                Clear <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
