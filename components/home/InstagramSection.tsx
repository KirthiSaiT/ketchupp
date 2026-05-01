"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

const INSTAGRAM_POSTS = [
  { src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80", span: "md:col-span-2 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80", span: "" },
  { src: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&q=80", span: "" },
  { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", span: "md:col-span-2" },
  { src: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80", span: "" },
  { src: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400&q=80", span: "" },
];

export default function InstagramSection() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                 <InstagramIcon className="w-6 h-6 text-brand-red" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">
                    @ketchuppclothing
                 </span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-brand-charcoal leading-none tracking-tighter">
                 FOLLOW THE <br />
                 <span className="text-brand-red italic font-serif">ARCHIVE</span>
              </h2>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
             <a 
               href="https://instagram.com/ketchuppclothing" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-brand-charcoal text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-red transition-all group"
             >
                Join the feed
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </a>
          </motion.div>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
           {INSTAGRAM_POSTS.map((post, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className={`relative group overflow-hidden rounded-3xl bg-brand-muted/10 ${post.span}`}
             >
                <Image 
                  src={post.src} 
                  alt="Insta" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-brand-red/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                   <InstagramIcon className="w-10 h-10 text-white animate-in zoom-in duration-300" />
                </div>
                
                {/* Floating Tags (Decorative) */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                   <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[8px] font-black uppercase text-white tracking-widest">
                      #ketchupp
                   </span>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
