"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, ArrowUpRight, MessageSquare, Info } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons/InstagramIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send the data here
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-8">
      
      {/* ── Main Content Experience ── */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* Left Side: Intel & Details */}
          <div className="lg:col-span-5 space-y-12">
            
            <div className="grid sm:grid-cols-2 gap-6">
               {[
                 { icon: Mail, label: "Intel Email", val: "hello@ketchupp.in", href: "mailto:hello@ketchupp.in" },
                 { icon: Instagram, label: "Social Hub", val: "@ketchuppclothing", href: "https://instagram.com/ketchuppclothing" },
                 { icon: Phone, label: "Direct Line", val: "+91 98765 43210", href: "tel:+919876543210" },
                 { icon: Clock, label: "Operational", val: "10:00 — 18:00 IST", href: null },
               ].map((item, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="p-8 rounded-[2.5rem] bg-white border border-brand-charcoal/5 group hover:border-brand-red/20 transition-all"
                 >
                    <item.icon className="w-6 h-6 text-brand-red mb-6" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal/30 mb-2">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-black text-brand-charcoal hover:text-brand-red transition-colors">
                         {item.val}
                      </a>
                    ) : (
                      <p className="text-sm font-black text-brand-charcoal">{item.val}</p>
                    )}
                 </motion.div>
               ))}
            </div>

            {/* Shipping Policy - Technical Block */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-12 rounded-[3rem] bg-brand-charcoal text-white relative overflow-hidden"
            >
               <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                     <Info className="w-6 h-6 text-brand-yellow" />
                     <h3 className="text-2xl font-black uppercase tracking-tighter">Shipping Protocols</h3>
                  </div>
                  <ul className="space-y-6">
                     {[
                       "Processing: 24 hours standard window.",
                       "Transit: 3-5 working days (Global average).",
                       "Complementary Delivery: Auto-applied above ₹999.",
                       "PO Box Access: Full India Post support active."
                     ].map((text, i) => (
                       <li key={i} className="flex gap-4 text-sm font-medium text-white/50 leading-relaxed">
                          <span className="text-brand-yellow font-black">0{i+1}</span>
                          {text}
                       </li>
                     ))}
                  </ul>
               </div>
               {/* Decorative Background Text */}
               <div className="absolute -bottom-10 -right-10 text-[100px] font-black text-white/5 pointer-events-none select-none tracking-tighter uppercase">
                  LOGS
               </div>
            </motion.div>
          </div>

          {/* Right Side: Form Interface */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="p-12 lg:p-16 rounded-[4rem] bg-white border border-brand-charcoal/5 shadow-2xl shadow-brand-charcoal/5"
                >
                  <div className="flex items-center gap-4 mb-12">
                     <MessageSquare className="w-6 h-6 text-brand-red" />
                     <h2 className="text-4xl font-black text-brand-charcoal uppercase tracking-tighter">Transmit Data</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-brand-charcoal/30 uppercase tracking-[0.2em] ml-2">Origin First Name</label>
                        <input 
                          type="text" 
                          required
                          className="w-full h-16 px-8 rounded-2xl bg-brand-cream/50 border border-brand-charcoal/5 text-brand-charcoal font-bold focus:outline-none focus:border-brand-red focus:bg-white transition-all"
                          placeholder="ARJUN"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-brand-charcoal/30 uppercase tracking-[0.2em] ml-2">Origin Last Name</label>
                        <input 
                          type="text" 
                          required
                          className="w-full h-16 px-8 rounded-2xl bg-brand-cream/50 border border-brand-charcoal/5 text-brand-charcoal font-bold focus:outline-none focus:border-brand-red focus:bg-white transition-all"
                          placeholder="M."
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-brand-charcoal/30 uppercase tracking-[0.2em] ml-2">Communication Email</label>
                      <input 
                        type="email" 
                        required
                        className="w-full h-16 px-8 rounded-2xl bg-brand-cream/50 border border-brand-charcoal/5 text-brand-charcoal font-bold focus:outline-none focus:border-brand-red focus:bg-white transition-all"
                        placeholder="HELLO@WORLD.COM"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-brand-charcoal/30 uppercase tracking-[0.2em] ml-2">Query Subject</label>
                      <select 
                        required
                        className="w-full h-16 px-8 rounded-2xl bg-brand-cream/50 border border-brand-charcoal/5 text-brand-charcoal font-bold focus:outline-none focus:border-brand-red focus:bg-white transition-all appearance-none"
                      >
                        <option value="">SELECT PROTOCOL...</option>
                        <option value="order">ORDER_TRACKING</option>
                        <option value="sizing">SIZING_ANALYSIS</option>
                        <option value="wholesale">WHOLESALE_PR</option>
                        <option value="other">GENERAL_QUERY</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-brand-charcoal/30 uppercase tracking-[0.2em] ml-2">Full Intel Message</label>
                      <textarea 
                        required
                        rows={5}
                        className="w-full px-8 py-6 rounded-3xl bg-brand-cream/50 border border-brand-charcoal/5 text-brand-charcoal font-bold focus:outline-none focus:border-brand-red focus:bg-white transition-all resize-none"
                        placeholder="PROVIDE DETAILS..."
                      />
                    </div>

                    <Button type="submit" className="w-full h-18 bg-brand-red hover:bg-brand-red/90 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-brand-red/20 transition-all active:scale-95 group">
                       Initialize Transmission
                       <Send className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-[4rem] border border-brand-charcoal/5"
                >
                   <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-8">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                   </div>
                   <h2 className="text-4xl font-black text-brand-charcoal uppercase tracking-tighter mb-4">Transmission Successful</h2>
                   <p className="text-brand-muted font-medium mb-12 max-w-sm">
                      Your data has been logged into the Ketchupp system. Our response team will connect within 24 operational hours.
                   </p>
                   <Button 
                     onClick={() => setSubmitted(false)}
                     variant="outline"
                     className="px-10 h-16 rounded-2xl border-brand-charcoal/10 text-brand-charcoal font-black uppercase tracking-widest text-[11px]"
                   >
                      Send New Intel
                   </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  );
}
