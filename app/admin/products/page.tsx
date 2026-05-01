import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ProductActions from "@/components/admin/ProductActions";

export default async function AdminProductsPage() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-playfair)" }}>
          Products Database
        </h1>
        <Link href="/admin/products/new" className="px-5 py-2.5 bg-[#C1121F] text-white font-bold rounded-xl text-sm hover:bg-[#a01019] transition-colors">
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#DDD8CE] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#EDE8E0] text-[#8B8580] text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDD8CE]">
            {products.map((p: any) => {
              const totalStock = p.sizes.reduce((acc: number, size: any) => acc + size.stock, 0);
              return (
                 <tr key={p._id.toString()} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-16 relative rounded-lg overflow-hidden bg-[#EDE8E0]">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#1A1A1A] text-sm line-clamp-1">{p.name}</p>
                    <div className="flex gap-2 mt-1">
                       {p.isBestseller && <Badge className="text-[10px] bg-[#FFD60A] text-[#1A1A1A] px-1.5 py-0">Bestseller</Badge>}
                       {p.isNewProduct && <Badge className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0">New</Badge>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#8B8580] text-sm capitalize">{p.category}</td>
                  <td className="px-6 py-4 text-[#1A1A1A] font-bold text-sm">₹{p.price.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${totalStock < 10 ? 'text-[#C1121F]' : 'text-green-700'}`}>
                      {totalStock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ProductActions 
                      productId={p._id.toString()} 
                      productName={p.name} 
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
