"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronRight, Truck, CheckCircle2, Clock, XCircle, AlertCircle, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  status: "processing" | "shipped" | "out-for-delivery" | "delivered" | "cancelled" | "refund-requested" | "refunded";
  total: number;
  createdAt: string;
  trackingNumber?: string;
}

const statusConfig = {
  processing: { label: "Processing", icon: Clock, color: "bg-blue-100 text-blue-700 border-blue-200" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-purple-100 text-purple-700 border-purple-200" },
  "out-for-delivery": { label: "Out for Delivery", icon: Truck, color: "bg-orange-100 text-orange-700 border-orange-200" },
  delivered: { label: "Delivered", icon: CheckCircle2, color: "bg-green-100 text-green-700 border-green-200" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-100 text-red-700 border-red-200" },
  "refund-requested": { label: "Refund Requested", icon: AlertCircle, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  refunded: { label: "Refunded", icon: CheckCircle2, color: "bg-gray-100 text-gray-700 border-gray-200" },
};

export default function OrdersClient({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] p-12 text-center border border-[#DDD8CE] shadow-sm">
        <div className="w-20 h-20 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-[#8B8580]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>No Orders Yet</h2>
        <p className="text-[#8B8580] mb-8 max-w-sm mx-auto">Your archive is currently empty. Start your collection with our latest drops.</p>
        <Link href="/products">
          <Button className="bg-[#1A1A1A] text-white rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-[10px]">
            Explore Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const StatusIcon = statusConfig[order.status]?.icon || Package;
        const statusStyle = statusConfig[order.status]?.color || "bg-gray-100 text-gray-700";

        return (
          <div key={order._id} className="bg-white rounded-[2rem] overflow-hidden border border-[#DDD8CE] shadow-sm transition-all hover:shadow-md group">
            {/* Order Header */}
            <div className="px-6 py-5 border-b border-[#FAF7F2] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", statusStyle)}>
                  <StatusIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B8580]">Order ID</p>
                  <p className="text-sm font-black text-[#1A1A1A]">#KC-{order._id.slice(-6).toUpperCase()}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B8580]">Placed On</p>
                  <p className="text-sm font-bold text-[#1A1A1A]">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B8580]">Total Amount</p>
                  <p className="text-sm font-black text-[#C1121F]">₹{order.total.toLocaleString("en-IN")}</p>
                </div>
                <Badge className={cn("rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-widest border shadow-none", statusStyle)}>
                  {statusConfig[order.status]?.label || order.status}
                </Badge>
              </div>
            </div>

            {/* Items Summary */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex -space-x-4 overflow-hidden flex-none">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="relative w-16 h-20 rounded-lg border-2 border-white overflow-hidden bg-[#EDE8E0] shadow-sm">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="relative w-16 h-20 rounded-lg border-2 border-white overflow-hidden bg-[#1A1A1A] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm font-bold text-[#1A1A1A] line-clamp-1">
                    {order.items.map(i => i.name).join(", ")}
                  </p>
                  <p className="text-xs text-[#8B8580] mt-1">
                    {order.items.length} {order.items.length === 1 ? "Item" : "Items"} in this order
                  </p>
                </div>

                <div className="flex gap-3 flex-none">
                  {order.trackingNumber && (
                    <Button variant="outline" className="rounded-xl border-[#DDD8CE] text-[10px] font-bold uppercase tracking-widest h-10 px-5 hover:bg-[#FAF7F2]">
                      Track Order
                    </Button>
                  )}
                  <Link href={`/account/orders/${order._id}`}>
                    <Button className="bg-[#FAF7F2] text-[#1A1A1A] rounded-xl text-[10px] font-bold uppercase tracking-widest h-10 px-5 hover:bg-[#EDE8E0] border border-[#DDD8CE]">
                      View Details <ChevronRight className="ml-2 w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
