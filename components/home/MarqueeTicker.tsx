"use client";

import React from "react";
import { motion } from "framer-motion";

const items = [
  "New Season 2026", "✦", "Ketchupp Archive",
  "✦", "Wear It Anywhere", "✦",
  "The Midnight Syndicate — May 15", "✦",
  "Free Shipping on All Orders", "✦",
  "Premium Streetwear", "✦", "Editorial Design",
  "✦", "New Season 2026", "✦",
];

export default function MarqueeTicker() {
  const ticker = [...items, ...items, ...items];
  
  return (
    <div className="relative bg-brand-red overflow-hidden py-5 border-y border-white/10">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ 
          duration: 30, 
          ease: "linear", 
          repeat: Infinity 
        }}
      >
        {ticker.map((item, i) => (
          <div
            key={i}
            className="flex items-center"
          >
            <span
              className={
                item === "✦"
                  ? "text-brand-yellow text-sm mx-8"
                  : "text-[11px] font-black uppercase tracking-[0.3em] text-white px-2"
              }
            >
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
