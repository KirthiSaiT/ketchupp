import { Package, ShoppingBag, IndianRupee } from "lucide-react";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Order } from "@/lib/models/Order";

export default async function AdminDashboardPage() {
  await connectDB();
  
  // Quick Dashboard Stats Fetch
  const productCount = await Product.countDocuments();
  const orderCount = await Order.countDocuments();
  
  const pendingOrders = await Order.find({ status: "processing" }).sort({ createdAt: -1 }).limit(5).lean();

  // Fetch products with low stock (<= 3 units in any size)
  const lowStockProducts = await Product.find({
    "sizes.stock": { $lte: 3 }
  }).limit(5).lean();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-[#DDD8CE] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#EDE8E0] rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-[#1A1A1A]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#8B8580]">Total Orders</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">{orderCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#DDD8CE] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#EDE8E0] rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-[#1A1A1A]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#8B8580]">Catalog Products</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">{productCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#DDD8CE] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <IndianRupee className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#8B8580]">Revenue Tracker</p>
            <p className="text-xs text-green-700 font-bold mt-1">Pending Sync</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Pending Orders */}
        <div>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Recent Pending Orders</h2>
          <div className="bg-white rounded-2xl border border-[#DDD8CE] shadow-sm overflow-hidden">
            {pendingOrders.length === 0 ? (
              <div className="p-8 text-center text-[#8B8580] text-sm font-semibold">
                No pending orders! You are all caught up.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#EDE8E0] text-[#8B8580] text-[10px] uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-4 py-4">ID</th>
                      <th className="px-4 py-4">Customer</th>
                      <th className="px-4 py-4">Total</th>
                      <th className="px-4 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDD8CE]">
                    {pendingOrders.map((order: any) => (
                      <tr key={order._id.toString()}>
                        <td className="px-4 py-4 font-mono text-[10px] text-[#1A1A1A]">#{order._id.toString().slice(-6).toUpperCase()}</td>
                        <td className="px-4 py-4 text-[#1A1A1A] text-sm font-semibold">{order.shipping.name}</td>
                        <td className="px-4 py-4 text-[#1A1A1A] font-bold text-sm">₹{order.total.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-4">
                          <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right: Low Stock Alerts */}
        <div>
          <h2 className="text-xl font-bold text-[#C1121F] mb-4">Inventory Alerts</h2>
          <div className="bg-white rounded-2xl border border-[#DDD8CE] shadow-sm overflow-hidden">
            {lowStockProducts.length === 0 ? (
              <div className="p-8 text-center text-[#8B8580] text-sm font-semibold">
                Inventory is healthy. All items in stock!
              </div>
            ) : (
              <div className="divide-y divide-[#DDD8CE]">
                {lowStockProducts.map((p: any) => (
                  <div key={p._id.toString()} className="p-4 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-[#EDE8E0] rounded-lg overflow-hidden relative">
                        {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="object-cover w-full h-full" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1A1A1A] line-clamp-1">{p.name}</p>
                        <div className="flex gap-2 mt-1">
                          {p.sizes.filter((s: any) => s.stock <= 3).map((s: any) => (
                            <span key={s.name} className="text-[10px] font-bold text-[#C1121F] bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                              {s.name}: {s.stock} left
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#8B8580] hover:text-[#1A1A1A] transition-colors">
                      Edit →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
