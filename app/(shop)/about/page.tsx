import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Ketchupp — Premium Urban Streetwear",
  description: "Discover the story behind Ketchupp — where premium textiles meet ethical assembly and limited-run designs. Our mission is to redefine the urban aesthetic.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=1600&q=90"
          alt="Ketchupp Studio"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 to-[#1A1A1A]/40" />
        <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-10 z-10">
          <p className="text-[#FFD60A] text-sm font-bold tracking-[0.2em] mb-4 uppercase">
            Our Story
          </p>
          <h1
            className="text-5xl lg:text-7xl font-black text-[#FAF7F2] leading-none mb-6 max-w-2xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Redefining the <br /> Urban Aesthetic.
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2
              className="text-3xl lg:text-5xl font-bold text-[#1A1A1A] mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Born from the streets. <br /> Crafted for the refined.
            </h2>
            <div className="space-y-6 text-[#8B8580] leading-relaxed text-lg">
              <p>
                Ketchupp started with a single, uncompromising vision: to bridge the gap between gritty urban streetwear and the meticulous craftsmanship of luxury fashion houses.
              </p>
              <p>
                We believe that the garments you wear everyday should be built to outlast seasons and trends. Fast fashion compromises on quality to meet a price tag. We compromise on nothing to create the perfect silhouette.
              </p>
              <p>
                Every piece in our collection is cut, dyed, and distressed with intention. From our heavyweight 240 GSM cotton essentials to our water-resistant tailored outerwear, the Vanguard Archive represents resilience and style.
              </p>
            </div>
            <Link href="/products">
              <Button className="mt-10 px-8 py-6 text-base font-bold bg-[#1A1A1A] text-white rounded-2xl hover:bg-[#C1121F] transition-colors">
                Explore the Archive <MoveRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#EDE8E0] relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
                alt="Model wearing Ketchupp"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#FFD60A] rounded-full mix-blend-multiply blur-2xl opacity-50 z-0 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Vitals */}
      <section className="bg-[#1A1A1A] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="md:px-8 pt-8 md:pt-0">
              <h3 className="text-5xl font-black text-[#FFD60A] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                01
              </h3>
              <h4 className="text-xl font-bold mb-3">Premium Textiles</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                We source directly from heritage mills to ensure extreme durability, texture, and natural fade over time.
              </p>
            </div>
            <div className="md:px-8 pt-8 md:pt-0">
              <h3 className="text-5xl font-black text-[#FFD60A] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                02
              </h3>
              <h4 className="text-xl font-bold mb-3">Ethical Assembly</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                No sweatshops. Our factory partners ensure fair wages, safe environments, and rigorous quality control.
              </p>
            </div>
            <div className="md:px-8 pt-8 md:pt-0">
              <h3 className="text-5xl font-black text-[#FFD60A] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                03
              </h3>
              <h4 className="text-xl font-bold mb-3">Limited Runs</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                To eliminate waste, we produce in deliberate, small-batch runs. Once a collection drops, it’s gone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 text-center max-w-3xl mx-auto px-4">
        <h2
          className="text-4xl font-bold text-[#1A1A1A] mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Join the Movement.
        </h2>
        <p className="text-[#8B8580] mb-8">
          Follow us behind the scenes on our design process, and get early access to exclusive drops.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 bg-[#1A1A1A] text-white rounded-full text-sm font-semibold hover:bg-[#C1121F] transition-colors"
          >
            Follow on Instagram
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white border border-[#DDD8CE] text-[#1A1A1A] rounded-full text-sm font-semibold hover:border-[#1A1A1A] transition-colors"
          >
            Contact the Atelier
          </Link>
        </div>
      </section>
    </div>
  );
}
