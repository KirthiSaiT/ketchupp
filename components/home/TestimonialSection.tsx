"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Arjun M.",
    role: "Collector",
    text: "The conceptual silhouettes are unlike anything in the Indian market. The build quality of the technical jackets is archival grade.",
    location: "Mumbai",
    avatar: "https://i.pravatar.cc/100?img=12",
    tag: "Verified Artifact",
  },
  {
    name: "Priya S.",
    role: "Visual Artist",
    text: "Fast delivery, but more importantly, the curation. The oversized tees have the perfect drop. Ketchupp is a movement, not just a brand.",
    location: "Bangalore",
    avatar: "https://i.pravatar.cc/100?img=44",
    tag: "Movement Member",
  },
  {
    name: "Rahul K.",
    role: "Architect",
    text: "Clinical precision in every stitch. The cargo pants have become my daily uniform. Minimalist yet aggressive design.",
    location: "Delhi",
    avatar: "https://i.pravatar.cc/100?img=33",
    tag: "Early Adopter",
  },
  {
    name: "Sneha V.",
    role: "Stylist",
    text: "The Midnight Syndicate drop is a masterclass in streetwear. The fabric choice feels high-end and the fit is consistently perfect.",
    location: "Pune",
    avatar: "https://i.pravatar.cc/100?img=22",
    tag: "Core Contributor",
  },
];

function TestimonialCard({ t, index }: { t: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-10 lg:p-12 rounded-[3rem] bg-white border border-brand-charcoal/5 group hover:border-brand-red/20 transition-all duration-700"
    >
       <div className="flex items-center justify-between mb-10">
          <div className="flex gap-1">
             {[...Array(5)].map((_, i) => (
               <Star key={i} className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
             ))}
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-red px-3 py-1 bg-brand-red/5 rounded-full">
             {t.tag}
          </span>
       </div>

       <p className="text-2xl lg:text-3xl font-bold text-brand-charcoal leading-snug tracking-tight mb-12 italic">
          "{t.text}"
       </p>

       <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-charcoal/5 p-1 group-hover:border-brand-red/30 transition-colors">
                <Image src={t.avatar} alt={t.name} fill className="rounded-full grayscale group-hover:grayscale-0 transition-all" />
             </div>
             <div>
                <p className="text-lg font-black text-brand-charcoal leading-none mb-1">{t.name}</p>
                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">{t.role} — {t.location}</p>
             </div>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-brand-charcoal/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <CheckCircle2 className="w-5 h-5 text-brand-red" />
          </div>
       </div>
    </motion.div>
  );
}

export default function TestimonialSection() {
  return (
    <section className="py-32 bg-brand-cream overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red mb-8 block">
                The Community
              </span>
              <h2 className="text-6xl lg:text-8xl font-black text-brand-charcoal leading-[0.9] tracking-tighter mb-10">
                VOICES OF THE <br />
                <span className="text-brand-red italic font-serif">MOVEMENT</span>
              </h2>
            </motion.div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 mb-4">
             <div className="flex flex-col items-end">
                <span className="text-4xl font-black text-brand-charcoal leading-none">50K+</span>
                <span className="text-[9px] font-bold text-brand-charcoal/40 uppercase tracking-widest">Global Collectors</span>
             </div>
             <div className="h-12 w-[1px] bg-brand-charcoal/10" />
             <div className="flex flex-col items-end">
                <span className="text-4xl font-black text-brand-charcoal leading-none">4.9/5</span>
                <span className="text-[9px] font-bold text-brand-charcoal/40 uppercase tracking-widest">Satisfaction rate</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {TESTIMONIALS.map((t, i) => (
             <TestimonialCard key={i} t={t} index={i} />
           ))}
        </div>

        {/* CTA Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
           <p className="text-[11px] font-bold text-brand-charcoal/40 uppercase tracking-[0.5em] mb-10">
              Join the syndicate on instagram
           </p>
           <a 
             href="https://instagram.com/ketchupp" 
             target="_blank"
             className="group inline-flex items-center gap-4 text-xl font-black text-brand-charcoal hover:text-brand-red transition-all"
           >
              @KETCHUPPCLOTHING
              <div className="w-12 h-12 rounded-full border border-brand-charcoal/10 flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white transition-all">
                 <ArrowUpRight className="w-5 h-5" />
              </div>
           </a>
        </motion.div>
      </div>
    </section>
  );
}
