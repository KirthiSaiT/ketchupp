"use client";
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, total, itemCount } = useCart();
  const shipping = total >= 999 ? 0 : 99;
  const grandTotal = total + shipping;

  return (
    <Sheet open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] bg-[#FAF7F2] border-l border-[#DDD8CE] flex flex-col p-0"
      >
        <SheetHeader className="px-6 py-5 border-b border-[#DDD8CE]">
          <div className="flex items-center justify-between">
            <SheetTitle
              className="text-lg font-bold text-[#1A1A1A]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Your Bag{" "}
              {itemCount > 0 && (
                <span className="text-sm font-normal text-[#8B8580] ml-1">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <div className="w-20 h-20 bg-[#EDE8E0] rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-[#8B8580]" />
            </div>
            <p className="text-[#8B8580] text-sm text-center">
              Your bag is empty. Start adding some great pieces!
            </p>
            <Button
              onClick={onClose}
              className="bg-[#C1121F] hover:bg-[#a01019] text-white rounded-xl px-6"
            >
              Shop Now
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm"
                >
                  <div className="relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-[#EDE8E0]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={onClose}
                      className="text-sm font-semibold text-[#1A1A1A] line-clamp-2 hover:text-[#C1121F] transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-[#8B8580] mt-0.5">
                      Size: {item.size}
                      {item.color && ` · ${item.color}`}
                    </p>
                    <p className="text-sm font-bold text-[#C1121F] mt-1">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[#DDD8CE] rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQty(item.id, item.size, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#EDE8E0] transition-colors text-[#1A1A1A]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item.id, item.size, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#EDE8E0] transition-colors text-[#1A1A1A]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-[#8B8580] hover:text-[#C1121F] transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="px-6 py-5 border-t border-[#DDD8CE] space-y-4 bg-white">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[#8B8580]">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-[#8B8580]">
                  <span>Shipping</span>
                  <span className={cn(shipping === 0 && "text-green-600 font-semibold")}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#8B8580]">
                    Free shipping on orders above ₹999
                  </p>
                )}
                <Separator className="bg-[#DDD8CE]" />
                <div className="flex justify-between font-bold text-[#1A1A1A]">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <Link href="/checkout" onClick={onClose} className="block">
                <Button className="w-full bg-[#FFD60A] hover:bg-[#e6c000] text-[#1A1A1A] font-bold rounded-xl py-6 text-base">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/cart" onClick={onClose} className="block">
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-[#DDD8CE] text-[#1A1A1A] hover:bg-[#EDE8E0]"
                >
                  View Full Cart
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
