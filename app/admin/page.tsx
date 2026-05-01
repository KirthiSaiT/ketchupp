import { Package, ShoppingBag, IndianRupee } from "lucide-react";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Order } from "@/lib/models/Order";

export default async function AdminDashboardPage() {
  await connectDB();
  
  // Quick Dashboard Stats Fetch
  const productCount = await Product.countDocuments();
  const orderCount = await Order.countDocuments();
  
  const pendingOrders = await Order.find({ status: "processing" }).limit(5).lean();

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

      <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Recent Pending Orders</h2>
      <div className="bg-white rounded-2xl border border-[#DDD8CE] shadow-sm overflow-hidden">
        {pendingOrders.length === 0 ? (
          <div className="p-8 text-center text-[#8B8580] text-sm font-semibold">
            No pending orders! You are all caught up.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#EDE8E0] text-[#8B8580] text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CE]">
              {pendingOrders.map((order: any) => (
                <tr key={order._id.toString()}>
                  <td className="px-6 py-4 font-semibold text-[#1A1A1A] text-sm">{order._id.toString().substring(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4 text-[#1A1A1A] text-sm">{order.shipping.name}</td>
                  <td className="px-6 py-4 text-[#8B8580] text-sm">{order.shipping.city}, {order.shipping.state}</td>
                  <td className="px-6 py-4 text-[#1A1A1A] font-bold text-sm">₹{order.total.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 text-[#1A1A1A] text-sm">
                     <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded-full font-bold">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
