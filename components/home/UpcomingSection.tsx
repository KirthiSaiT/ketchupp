"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / (1000 * 60)) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

interface UpcomingSectionProps {
  settings?: {
    showUpcoming: boolean;
    upcomingTitle: string;
    upcomingDescription: string;
    upcomingDate: string;
  };
}

export default function UpcomingSection({ settings }: UpcomingSectionProps) {
  const [mounted, setMounted] = useState(false);
  const dropDate = new Date(settings?.upcomingDate || "2026-05-15T00:00:00");
  const countdown = useCountdown(dropDate);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!settings?.showUpcoming) {
    return null;
  }

  const displayTime = mounted ? countdown : { d: 0, h: 0, m: 0, s: 0 };

  return (
    <section className="relative py-32 bg-brand-charcoal overflow-hidden group">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-red/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-yellow/5 blur-[180px] rounded-full" />
        
        {/* Aceternity Grid Effect */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 backdrop-blur-md mb-8">
                 <Timer className="w-4 h-4 text-brand-yellow animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-yellow">
                   Dropping {dropDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                 </span>
              </div>
              
              <h2 className="text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-10 tracking-tighter uppercase whitespace-pre-line">
                {settings.upcomingTitle}
              </h2>
              
              <p className="text-white/40 text-xl font-medium leading-relaxed max-w-lg mb-14 mx-auto lg:mx-0 whitespace-pre-line">
                {settings.upcomingDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto lg:mx-0">
                 <div className="relative w-full">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email for the whitelist"
                      className="w-full h-16 px-8 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-red/50 transition-colors"
                    />
                 </div>
                 <Button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-brand-red hover:bg-brand-red/90 text-white font-bold uppercase tracking-widest text-xs border-none group">
                    <Bell className="w-4 h-4 mr-2" />
                    Notify Me
                 </Button>
              </div>
              
              <p className="mt-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                 Limited units. No restock. Phase 01.
              </p>
            </motion.div>
          </div>

          {/* Large Countdown Cards */}
          <div className="lg:w-1/2">
             <div className="grid grid-cols-2 gap-6">
                {[
                  { val: displayTime.d, label: "Days" },
                  { val: displayTime.h, label: "Hours" },
                  { val: displayTime.m, label: "Mins" },
                  { val: displayTime.s, label: "Secs" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center group/card hover:bg-white/10 transition-colors"
                  >
                     <span className="text-5xl lg:text-7xl font-black text-brand-yellow tabular-nums leading-none mb-4 group-hover/card:scale-110 transition-transform">
                        {String(item.val).padStart(2, "0")}
                     </span>
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                        {item.label}
                     </span>
                  </motion.div>
                ))}
             </div>
             
             {/* Decorative Element */}
             <div className="mt-12 flex items-center justify-center gap-8 opacity-20">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white" />
                <span className="text-[9px] font-bold text-white tracking-[1em] uppercase">Phase 01</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white" />
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
