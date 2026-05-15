"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MousePointer2 } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HERO_SLIDES = [
  {
    id: 1,
    headline: "The Archive Collection",
    sub: "Editorial fashion for the daring.",
    cta: "Shop Jackets",
    href: "/products?category=jackets",
    badge: "NEW DROP",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=1600&q=90",
    accent: "#FFD60A",
  },
  {
    id: 2,
    headline: "Street. Refined.",
    sub: "Premium streetwear meets luxury boutique.",
    cta: "Shop Tops",
    href: "/products?category=tops",
    badge: "BESTSELLERS",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=90",
    accent: "#FFD60A",
  },
  {
    id: 3,
    headline: "Move Bold.",
    sub: "Essential bottoms built for any city.",
    cta: "Shop Bottoms",
    href: "/products?category=bottoms",
    badge: "TRENDING",
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=1600&q=90",
    accent: "#FFD60A",
  },
  {
    id: 4,
    headline: "Step Ahead.",
    sub: "Footwear designed for the modern explorer.",
    cta: "Shop Shoes",
    href: "/products?category=shoes",
    badge: "EXCLUSIVE",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=90",
    accent: "#FFD60A",
  },
  {
    id: 5,
    headline: "Signature Details.",
    sub: "Finish the look with our curated accessories.",
    cta: "Shop Accessories",
    href: "/products?category=accessories",
    badge: "SIGNATURE",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1600&q=90",
    accent: "#FFD60A",
  },
  {
    id: 6,
    headline: "Fresh Release.",
    sub: "Our latest drops and archival finds.",
    cta: "Shop New",
    href: "/products?category=new",
    badge: "JUST IN",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=90",
    accent: "#FFD60A",
  },
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-[92vh] min-h-[700px] overflow-hidden bg-brand-charcoal">
      {/* Background Grid - Aceternity Inspired */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {HERO_SLIDES.map((slide, index) => (
            <div key={slide.id} className="embla__slide relative flex-none w-full h-full">
              {/* Image with Parallax-ish feel */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover scale-105"
                  quality={90}
                />
                {/* Darker, cleaner gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center items-start">
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-2xl"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                          {slide.badge}
                        </span>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-6xl sm:text-8xl lg:text-9xl font-black text-white leading-[0.9] mb-8"
                        style={{ letterSpacing: "-0.04em" }}
                      >
                        {slide.headline.split(' ').map((word, i) => (
                          <span key={i} className="block">
                            {word === "Archive" || word === "Refined." || word === "Bold." ? (
                              <span className="text-brand-red italic font-serif pr-2">{word}</span>
                            ) : word}
                          </span>
                        ))}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg sm:text-xl text-white/50 max-w-md mb-12 font-medium"
                      >
                        {slide.sub}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col gap-10"
                      >
                        <Link href={slide.href}>
                          <Button 
                            className="h-16 px-10 text-sm font-bold uppercase tracking-widest rounded-full bg-brand-red hover:bg-brand-red/90 text-white border-none shadow-2xl shadow-brand-red/20 transition-all hover:scale-105 active:scale-95 group"
                          >
                            {slide.cta}
                            <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                        
                        {/* Navigation Controls Integrated into Slide Content */}
                        <div className="flex items-center gap-10">
                           {/* Arrows */}
                           <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => { e.preventDefault(); scrollPrev(); }}
                                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-brand-red transition-all group/btn"
                              >
                                <ChevronLeft className="w-5 h-5 text-white group-hover/btn:-translate-x-0.5 transition-transform" />
                              </button>
                              <button
                                onClick={(e) => { e.preventDefault(); scrollNext(); }}
                                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-brand-red transition-all group/btn"
                              >
                                <ChevronRight className="w-5 h-5 text-white group-hover/btn:translate-x-0.5 transition-transform" />
                              </button>
                           </div>

                           {/* Progress Dots */}
                           <div className="flex items-center gap-4">
                              {HERO_SLIDES.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => { e.preventDefault(); scrollTo(i); }}
                                  className="relative group py-2"
                                >
                                  <div className={`h-[2px] transition-all duration-500 rounded-full ${
                                    i === selectedIndex ? "w-10 bg-brand-red" : "w-4 bg-white/20 group-hover:bg-white/40"
                                  }`} />
                                </button>
                              ))}
                           </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Elements / Ambient Glow */}
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-brand-yellow/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
