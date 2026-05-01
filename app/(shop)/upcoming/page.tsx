import type { Metadata } from "next";
import UpcomingClient from "@/components/shop/UpcomingClient";

export const metadata: Metadata = {
  title: "Upcoming Drop: Season 02 | Ketchupp Store",
  description: "The Vanguard Archive is coming soon. Premium fabrics, experimental silhouettes, limited quantities. Join the waitlist for exclusive 1-hour early access.",
};

export default function UpcomingPage() {
  return <UpcomingClient />;
}
