import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/Order";
import { Badge } from "@/components/ui/badge";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function AdminOrdersPage() {
  await connectDB();
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
        Order Management
      </h1>

      <div className="bg-white rounded-2xl border border-[#DDD8CE] shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-10 text-center text-[#8B8580]">
             No orders have been placed yet.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#EDE8E0] text-[#8B8580] text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Order ID / Date</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Fulfillment Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CE]">
              {orders.map((order: any) => (
                 <tr key={order._id.toString()}>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#1A1A1A] text-sm">{order._id.toString().substring(0, 8).toUpperCase()}</p>
                    <p className="text-xs text-[#8B8580] mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 text-[#1A1A1A] text-sm">
                    <p className="font-bold">{order.shipping.name}</p>
                    <p className="text-[#8B8580] text-xs mt-0.5">{order.shipping.city}, {order.shipping.state}</p>
                    <p className="text-[#8B8580] text-xs">{order.shipping.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${order.payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                       {order.payment.status.toUpperCase()}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-[#1A1A1A] font-bold text-sm">₹{order.total.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <OrderStatusSelect 
                      orderId={order._id.toString()} 
                      initialStatus={order.status} 
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                     <button className="text-xs font-bold text-[#C1121F] hover:underline">View Invoice</button>
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
