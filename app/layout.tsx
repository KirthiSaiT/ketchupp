import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ketchupp — Premium Streetwear & Fashion",
    template: "%s | Ketchupp",
  },
  description:
    "Discover bold, editorial fashion at Ketchupp. Shop premium jackets, tops, bottoms, shoes, and accessories. Where streetwear meets luxury.",
  keywords: ["Ketchupp", "streetwear", "luxury fashion", "clothing", "jackets", "premium"],
  openGraph: {
    title: "Ketchupp — Premium Streetwear & Fashion",
    description: "Bold, editorial fashion. Premium streetwear meets luxury boutique.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${playfair.variable} ${inter.variable} h-full`}
      >
        <body className="min-h-full flex flex-col antialiased">
          {children}
          <Toaster richColors position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
