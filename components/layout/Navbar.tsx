"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { ShoppingBag, Heart, Search, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavourites } from "@/context/FavouritesContext";
import CartDrawer from "./CartDrawer";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Tops", href: "/collections/tops" },
  { label: "Bottoms", href: "/collections/bottoms" },
  { label: "Jackets", href: "/collections/jackets" },
  { label: "Shoes", href: "/collections/shoes" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();
  const { favourites } = useFavourites();
  const { user, isLoaded, isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#DDD8CE]"
            : "bg-[#FAF7F2]/80 backdrop-blur-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <span
                className="text-2xl lg:text-3xl font-black tracking-tight text-[#1A1A1A] group-hover:text-[#C1121F] transition-colors duration-200"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                KETCHUPP
              </span>
            </Link>

            {/* Center Nav — Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold tracking-wide uppercase transition-colors duration-200 relative group",
                    pathname === link.href || pathname.startsWith(link.href.split("?")[0])
                      ? "text-[#C1121F]"
                      : "text-[#1A1A1A] hover:text-[#C1121F]"
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD60A] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-[#EDE8E0] transition-colors duration-200"
              >
                <Search className="w-5 h-5 text-[#1A1A1A]" />
              </button>

              {/* Favourites */}
              <Link
                href="/account/favourites"
                className="relative p-2 rounded-full hover:bg-[#EDE8E0] transition-colors duration-200"
              >
                <Heart className="w-5 h-5 text-[#1A1A1A]" />
                {favourites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C1121F] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {favourites.length > 9 ? "9+" : favourites.length}
                  </span>
                )}
              </Link>

              {/* Account */}
              {isLoaded && isSignedIn ? (
                <div className="flex items-center gap-1.5">
                  <Link 
                    href="/account/orders" 
                    className="p-2 rounded-full hover:bg-[#EDE8E0] transition-colors text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5"
                    title="View My Orders"
                  >
                    <User className="w-5 h-5 text-[#1A1A1A]" />
                    <span className="hidden sm:inline">My Orders</span>
                  </Link>
                  <UserButton appearance={{ elements: { avatarBox: "w-8.5 h-8.5" } }} />
                </div>
              ) : (
                <Link href="/sign-in" className="p-2 rounded-full hover:bg-[#EDE8E0] transition-colors">
                  <User className="w-5 h-5 text-[#1A1A1A]" />
                </Link>
              )}

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 bg-[#C1121F] text-white rounded-full hover:bg-[#a01019] transition-colors duration-200"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FFD60A] text-[#1A1A1A] text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden p-2 rounded-full hover:bg-[#EDE8E0]"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 animate-in slide-in-from-top duration-300">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for jackets, tops, shoes..."
                  className="flex-1 px-4 py-2.5 bg-[#EDE8E0] rounded-xl text-[#1A1A1A] placeholder:text-[#8B8580] text-sm focus:outline-none focus:ring-2 focus:ring-[#C1121F]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C1121F] text-white rounded-xl text-sm font-semibold"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-t border-[#DDD8CE] px-4 py-6">
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-semibold text-[#1A1A1A] hover:text-[#C1121F]"
                >
                  {link.label}
                </Link>
              ))}
              {isSignedIn && (
                <Link
                  href="/account/orders"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-semibold text-[#C1121F] border-t border-[#DDD8CE] pt-4 mt-2 flex items-center gap-2"
                >
                  <User className="w-5 h-5" /> My Orders
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
