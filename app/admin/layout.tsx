import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Package, LayoutGrid, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Ketchupp",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const adminId = process.env.ADMIN_CLERK_ID;

  // Strict check: User must be signed in AND their Clerk ID must match the environment variable perfectly
  if (!user || !adminId || user.id !== adminId) {
    redirect("/"); 
  }

  return (
    <div className="flex h-screen bg-[#FAF7F2] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A1A] text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin">
            <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              KETCHUPP
            </span>
          </Link>
          <p className="text-[#8B8580] text-xs font-semibold uppercase tracking-wider mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <LayoutDashboard className="w-5 h-5 text-[#FFD60A]" />
            <span className="font-semibold text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
            <ShoppingBag className="w-5 h-5 text-[#8B8580]" />
            <span className="font-semibold text-sm text-[#DDD8CE]">Manage Orders</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
            <Package className="w-5 h-5 text-[#8B8580]" />
            <span className="font-semibold text-sm text-[#DDD8CE]">Manage Products</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
            <LayoutGrid className="w-5 h-5 text-[#8B8580]" />
            <span className="font-semibold text-sm text-[#DDD8CE]">Dynamic Categories</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold text-sm">Return to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
