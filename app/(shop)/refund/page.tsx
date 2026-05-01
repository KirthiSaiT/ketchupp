import type { Metadata } from "next";
import RefundClient from "@/components/shop/RefundClient";

export const metadata: Metadata = {
  title: "Refund Request | Ketchupp Store",
  description: "Initiate a refund or return request for your Ketchupp order. Please ensure you have your unboxing video ready as per our policy.",
};

export default function RefundPage() {
  return <RefundClient />;
}
