"use client";

import React, { useState, useEffect } from "react";
import { getBestsellers } from "@/lib/actions/product.action";
import { getCategories } from "@/lib/actions/category.action";

// New Premium Components
import HeroSection from "@/components/home/HeroSection";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import CategorySection from "@/components/home/CategorySection";
import BestsellerSection from "@/components/home/BestsellerSection";
import UpcomingSection from "@/components/home/UpcomingSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import InstagramSection from "@/components/home/InstagramSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  const [dbBestsellers, setDbBestsellers] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getBestsellers().then(res => setDbBestsellers(res)),
      getCategories().then(res => setDbCategories(res))
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-brand-cream min-h-screen">
      {/* 1. Hero Experience */}
      <HeroSection />

      {/* 2. Brand Marquee */}
      <MarqueeTicker />

      {/* 3. Shop by Collections */}
      <CategorySection categories={dbCategories} />

      {/* 4. Top Hits / Bestsellers */}
      <BestsellerSection products={dbBestsellers} />

      {/* 5. Limited Drop Teaser */}
      <UpcomingSection />

      {/* 6. Social Proof / Community */}
      <TestimonialSection />

      {/* 7. Social Feed */}
      <InstagramSection />

      {/* 8. Newsletter Capture */}
      <NewsletterSection />
    </main>
  );
}
