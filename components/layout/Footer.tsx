"use client";
import React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons/InstagramIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-[#FAF7F2] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-black tracking-tighter" style={{ fontFamily: "var(--font-playfair)" }}>
                KETCHUPP
              </span>
            </Link>
            <p className="text-[#8B8580] text-sm leading-relaxed mb-6 max-w-xs">
              Premium streetwear meets luxury boutique. Built for the modern archive.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/ketchuppclothing" target="_blank" rel="noreferrer" className="text-[#8B8580] hover:text-[#FFD60A] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:hello@ketchupp.in" className="text-[#8B8580] hover:text-[#FFD60A] transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-[#8B8580]">
              <li><Link href="/products" className="hover:text-white transition-colors">All Collections</Link></li>
              <li><Link href="/products?category=tops" className="hover:text-white transition-colors">Tops</Link></li>
              <li><Link href="/products?category=bottoms" className="hover:text-white transition-colors">Bottoms</Link></li>
              <li><Link href="/products?category=jackets" className="hover:text-white transition-colors">Jackets</Link></li>
              <li><Link href="/products?category=shoes" className="hover:text-white transition-colors">Shoes</Link></li>
              <li><Link href="/products?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Support Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-[#8B8580]">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/refund" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] mb-6">Stay Connected</h4>
            <p className="text-xs text-[#8B8580] mb-4 font-medium italic">Season 2 Drop Coming Soon.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-[#FFD60A]"
              />
              <button className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs font-bold transition-colors">Join</button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-[#444]">
            <p>© {currentYear} KETCHUPP</p>
            <div className="hidden md:flex gap-6">
              <Link href="/contact" className="hover:text-[#8B8580] transition-colors">Privacy</Link>
              <Link href="/contact#shipping" className="hover:text-[#8B8580] transition-colors">Shipping</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#8B8580] bg-white/5 px-4 py-2 rounded-full">
            <MapPin className="w-3 h-3 text-[#FFD60A]" />
            <span>Post Office Delivery Active Across India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
