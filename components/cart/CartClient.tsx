"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function CartClient() {
  const { items, removeItem, updateQty, total, itemCount, clearCart } = useCart();
  const shipping = 0;
  const grandTotal = total;

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 bg-[#EDE8E0] rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-[#8B8580]" />
        </div>
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
          Your bag is empty
        </h2>
        <p className="text-[#8B8580] text-sm mb-8 text-center max-w-xs">
          Looks like you haven&apos;t added anything yet. Start shopping to fill it up!
        </p>
        <Link href="/products">
          <Button className="bg-[#C1121F] hover:bg-[#a01019] text-white rounded-xl px-8 py-5 font-bold text-base">
            Shop Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Header */}
      <div className="bg-[#1A1A1A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] mb-2">Review</p>
          <h1 className="text-4xl font-bold text-[#FAF7F2]" style={{ fontFamily: "var(--font-playfair)" }}>
            Your Bag
          </h1>
          <p className="text-[#8B8580] mt-1 text-sm">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ─── Cart Items ─── */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border border-[#DDD8CE]">
                <div className="relative w-24 h-28 flex-none rounded-xl overflow-hidden bg-[#EDE8E0]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${item.slug}`} className="font-semibold text-[#1A1A1A] hover:text-[#C1121F] transition-colors line-clamp-2 text-sm">
                      {item.name}
                    </Link>
                    <button
                      onClick={() => { removeItem(item.id, item.size); toast("Item removed from bag"); }}
                      className="text-[#8B8580] hover:text-[#C1121F] transition-colors flex-none"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-2 mt-1.5">
                    <Badge variant="outline" className="text-[10px] text-[#8B8580] border-[#DDD8CE] rounded-full px-2 py-0.5">
                      Size: {item.size}
                    </Badge>
                    {item.color && (
                      <Badge variant="outline" className="text-[10px] text-[#8B8580] border-[#DDD8CE] rounded-full px-2 py-0.5">
                        {item.color}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center border border-[#DDD8CE] rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.size, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#EDE8E0] transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      </button>
                      <span className="w-10 h-9 flex items-center justify-center text-sm font-bold text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.size, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#EDE8E0] transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      </button>
                    </div>
                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-[#C1121F]">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-[#8B8580]">₹{item.price.toLocaleString("en-IN")} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => { clearCart(); toast("Cart cleared"); }}
              className="text-xs text-[#8B8580] hover:text-[#C1121F] transition-colors font-semibold flex items-center gap-1 mt-2"
            >
              <Trash2 className="w-3 h-3" /> Clear all items
            </button>
          </div>

          {/* ─── Order Summary ─── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[#DDD8CE] sticky top-24">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-5" style={{ fontFamily: "var(--font-playfair)" }}>
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="flex gap-2 mb-5">
                <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-[#EDE8E0] rounded-xl">
                  <Tag className="w-4 h-4 text-[#8B8580] flex-none" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#8B8580] focus:outline-none flex-1"
                  />
                </div>
                <Button className="bg-[#1A1A1A] text-white rounded-xl text-sm font-semibold hover:bg-[#333]">
                  Apply
                </Button>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm text-[#8B8580]">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-[#8B8580]">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">
                    FREE
                  </span>
                </div>
              </div>

              <Separator className="bg-[#DDD8CE] mb-4" />

              <div className="flex justify-between font-bold text-[#1A1A1A] text-lg mb-6">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-[#FFD60A] hover:bg-[#e6c000] text-[#1A1A1A] font-bold rounded-xl py-6 text-base">
                  Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/products" className="block mt-3">
                <Button variant="outline" className="w-full rounded-xl border-[#DDD8CE] text-sm text-[#8B8580] hover:text-[#1A1A1A]">
                  Continue Shopping
                </Button>
              </Link>

              <div className="mt-5 flex items-center justify-center gap-4">
                {["UPI", "Cards", "Wallets", "COD"].map((m) => (
                  <span key={m} className="text-[9px] font-bold uppercase tracking-wider text-[#8B8580] bg-[#EDE8E0] rounded px-2 py-1">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
