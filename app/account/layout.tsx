"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Heart, MapPin, User, LogOut } from "lucide-react";
import { SignOutButton, useUser, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { FavouritesProvider } from "@/context/FavouritesContext";

const SIDEBAR_LINKS = [
  { label: "My Orders", href: "/account/orders", icon: <Package className="w-4 h-4" /> },
  { label: "Favourites", href: "/account/favourites", icon: <Heart className="w-4 h-4" /> },
  { label: "Profile", href: "/account/profile", icon: <User className="w-4 h-4" /> },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <CartProvider>
      <FavouritesProvider>
        <Navbar />
        <div className="bg-[#FAF7F2] min-h-screen pt-20 pb-20">
          <div className="bg-[#1A1A1A] py-14 mb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold text-[#FAF7F2]" style={{ fontFamily: "var(--font-playfair)" }}>
                My Account
              </h1>
              <ClerkLoading>
                <Skeleton className="h-4 w-40 mt-2 bg-white/20" />
              </ClerkLoading>
              <ClerkLoaded>
                {user && (
                  <p className="text-[#8B8580] mt-2 text-sm flex items-center gap-2">
                    Welcome back, <span className="text-[#FFD60A]">{user.fullName || user.firstName || 'Shopper'}</span>
                  </p>
                )}
              </ClerkLoaded>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64 flex-none">
                <nav className="bg-white rounded-3xl p-4 border border-[#DDD8CE] shadow-sm flex flex-col gap-1 sticky top-24">
                  {SIDEBAR_LINKS.map(link => {
                    const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                          active ? "bg-[#1A1A1A] text-white" : "text-[#8B8580] hover:bg-[#EDE8E0] hover:text-[#1A1A1A]"
                        }`}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    )
                  })}
                  <div className="my-2 border-t border-[#DDD8CE]" />
                  <SignOutButton>
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#C1121F] hover:bg-[#C1121F]/10 transition-colors w-full text-left">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </SignOutButton>
                </nav>
              </div>

              {/* Main Area */}
              <div className="flex-1 min-w-0">
                {children}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </FavouritesProvider>
    </CartProvider>
  );
}
