import type { Metadata } from "next";
import ContactClient from "@/components/shop/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Ketchupp Store",
  description: "Have questions about your order, sizing, or styling? Contact the Ketchupp team. We're here to help with all your inquiries.",
};

export default function ContactPage() {
  return <ContactClient />;
}
