"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Timer, ArrowRight, Lock, EyeOff } from "lucide-react";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

const GALLERY = [
  { id: 1, src: "https://images.unsplash.com/photo-1517438322307-e67111335449?w=800&q=80" },
  { id: 2, src: "https://images.unsplash.com/photo-1549845347-f41dbdc909d9?w=800&q=80" },
  { id: 3, src: "https://images.unsplash.com/photo-1560935560-6dd8a28e932b?w=800&q=80" },
  { id: 4, src: "https://images.unsplash.com/photo-1495383377740-410714ed976b?w=800&q=80" },
];

export default function UpcomingClient() {
  const dropDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000);
  const countdown = useCountdown(dropDate);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#1A1A1A] min-h-screen text-[#FAF7F2] relative">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center p-4 py-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C1121F]/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FFD60A]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        
        <div className="z-10 text-center max-w-3xl w-full">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8 backdrop-blur-md">
            <Timer className="w-4 h-4 text-[#FFD60A]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A]">Season 02 Unlocked Soon</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none" style={{ fontFamily: "var(--font-playfair)" }}>
            THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD60A] to-[#C1121F]">VANGUARD</span><br/> ARCHIVE
          </h1>

          <p className="text-[#8B8580] text-lg md:text-xl max-w-xl mx-auto mb-16 leading-relaxed">
            Our most ambitious collection yet. Premium fabrics, experimental silhouettes, limited quantities. Once it's gone, it's gone.
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-4 sm:gap-8 mb-16">
            {[
              { val: countdown.d, label: "Days" },
              { val: countdown.h, label: "Hours" },
              { val: countdown.m, label: "Mins" },
              { val: countdown.s, label: "Secs" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-20 h-24 sm:w-28 sm:h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center mb-3 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <span className="text-4xl sm:text-6xl font-black tabular-nums tracking-tighter" style={{ fontFamily: "var(--font-playfair)" }}>
                    {String(val).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-[#8B8580] font-semibold">{label}</span>
              </div>
            ))}
          </div>

          {/* Connect Form */}
          {!submitted ? (
            <div className="max-w-md mx-auto bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-2">Gain Early Access</h3>
              <p className="text-sm text-[#8B8580] mb-6">Subscribers get the password 1 hour before the public drop.</p>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#FFD60A] transition-colors"
                />
                <Button type="submit" className="w-full bg-[#FFD60A] text-[#1A1A1A] hover:bg-[#e6c000] rounded-xl py-6 font-bold text-lg flex items-center justify-center gap-2">
                  Unlock Access <Lock className="w-4 h-4" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-green-900/20 p-8 rounded-3xl border border-green-500/30 backdrop-blur-xl">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">You're on the list.</h3>
              <p className="text-[#8B8580] text-sm mb-0">Check your inbox 1 hour before the drop time for your exclusive password.</p>
            </div>
          )}
        </div>
      </div>

      {/* Blurred Sneak Peek */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Classified Previews</h2>
          <div className="flex items-center gap-2 text-xs text-[#8B8580] font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full">
            <EyeOff className="w-4 h-4" /> Strictly Confidential
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY.map((img, i) => (
            <div key={img.id} className="relative aspect-[3/4] bg-[#222] rounded-2xl overflow-hidden group">
              <Image 
                src={img.src} 
                alt="Sneak peek" 
                fill 
                className={`object-cover transition-all duration-1000 ${i % 2 === 0 ? "blur-md scale-110" : "blur-lg scale-125"} group-hover:blur-sm opacity-50`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Lock className="w-8 h-8 text-white/50" />
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Look {String(i+1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
