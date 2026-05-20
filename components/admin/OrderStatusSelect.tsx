"use client";
import React, { useState } from "react";
import { updateOrderStatus } from "@/lib/actions/order.action";
import { toast } from "sonner";

interface OrderStatusSelectProps {
  orderId: string;
  initialStatus: string;
}

export default function OrderStatusSelect({ orderId, initialStatus }: OrderStatusSelectProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setLoading(true);
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setStatus(newStatus);
        toast.success("Order status updated successfully!");
      } else {
        toast.error("Failed to update status: " + res.error);
      }
    } catch (error: any) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      disabled={loading}
      onChange={handleStatusChange}
      className="bg-[#EDE8E0] text-xs font-bold text-[#1A1A1A] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#C1121F] disabled:opacity-50"
    >
      <option value="processing">Processing</option>
      <option value="shipped">Shipped</option>
      <option value="out-for-delivery">Out for Delivery</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}
