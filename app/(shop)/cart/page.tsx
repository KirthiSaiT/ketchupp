import type { Metadata } from "next";
import CartClient from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "Your Bag",
  description: "Review your Ketchupp shopping bag before checkout.",
};

export default function CartPage() {
  return <CartClient />;
}
