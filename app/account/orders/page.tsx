import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@clerk/nextjs/server";
import { getUserOrders } from "@/lib/actions/order.action";
import { redirect } from "next/navigation";

import { Metadata } from "next";
import OrdersClient from "@/components/account/OrdersClient";

export const metadata: Metadata = {
  title: "My Orders | Ketchupp",
  description: "View and track your previous orders, and manage refund requests.",
};

export default async function OrdersPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in?redirect=/account/orders");
  }

  const orders = await getUserOrders(user.id);

  return <OrdersClient orders={orders} />;
}
