import { CartProvider } from "@/context/CartContext";
import { FavouritesProvider } from "@/context/FavouritesContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FavouritesProvider>
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <Footer />
      </FavouritesProvider>
    </CartProvider>
  );
}
