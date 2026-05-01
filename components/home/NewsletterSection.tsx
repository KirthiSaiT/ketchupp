"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative py-24 bg-brand-red overflow-hidden">
      {/* Background Text - Big & Subtle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none">
         <span className="text-[20vw] font-black text-white leading-none whitespace-nowrap">
            KETCHUPP SYNDICATE
         </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
              JOIN THE <br className="sm:hidden" /> <span className="text-brand-yellow italic font-serif">FAMILY</span>
            </h2>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto font-medium">
              Get 10% off your first order and exclusive access to the Archive drops. 
              No spam, just premium content.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Drop your email here..."
                    className="w-full h-16 px-8 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow/50 transition-colors"
                    required
                  />
                </div>
                <Button className="h-16 px-10 rounded-2xl bg-brand-yellow hover:bg-white text-brand-charcoal font-black uppercase tracking-[0.2em] text-xs border-none transition-all active:scale-95 group">
                  Subscribe
                  <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-4 px-10 py-6 rounded-3xl bg-brand-yellow text-brand-charcoal"
              >
                 <CheckCircle2 className="w-8 h-8" />
                 <div className="text-left">
                    <p className="text-lg font-black leading-none mb-1 uppercase tracking-tight">You're in!</p>
                    <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Check your inbox for the 10% code.</p>
                 </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
