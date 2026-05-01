import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@clerk/nextjs/server";
import { getUserOrders } from "@/lib/actions/order.action";
import { redirect } from "next/navigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Ketchupp",
  description: "View and track your previous orders, and manage refund requests.",
};

export default async function OrdersPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const orders = await getUserOrders(user.id);

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-[#DDD8CE] text-center shadow-sm">
        <div className="w-20 h-20 bg-[#EDE8E0] rounded-full flex items-center justify-center mx-auto mb-5">
          <Package className="w-10 h-10 text-[#8B8580]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>No orders yet</h2>
        <p className="text-[#8B8580] mb-6">When you place your first order, it will appear here.</p>
        <Link href="/products" className="inline-flex px-6 py-3 bg-[#1A1A1A] text-white rounded-xl font-bold hover:bg-[#333] transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 border-b border-[#DDD8CE] pb-4" style={{ fontFamily: "var(--font-playfair)" }}>
        Order History
      </h2>
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order._id.toString()} className="bg-white rounded-3xl p-6 border border-[#DDD8CE] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-[#8B8580] font-semibold mb-1">Order {order._id.toString().substring(0, 8).toUpperCase()}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#8B8580] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <Badge className={`${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'} rounded-full px-2.5 shadow-none capitalize`}>
                    {order.status}
                  </Badge>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-[#8B8580] uppercase tracking-wide font-semibold mb-1">Total</p>
                <p className="font-bold text-[#1A1A1A] text-lg">₹{order.total.toLocaleString("en-IN")}</p>
              </div>
            </div>

            <div className="space-y-4">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4 py-3 border-t border-[#EDE8E0]">
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#EDE8E0] flex-none">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1A1A1A] text-sm line-clamp-1">{item.name}</p>
                    <p className="text-xs text-[#8B8580] mt-1">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#DDD8CE] flex flex-col sm:flex-row gap-3">
              <Link href="/refund" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#DDD8CE] text-sm font-semibold text-[#1A1A1A] hover:bg-[#EDE8E0] transition-colors">
                <AlertCircle className="w-4 h-4 text-[#8B8580]" />
                Request Refund
              </Link>
              <button className="flex-1 inline-flex items-center justify-center border border-[#1A1A1A] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors">
                Track Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
