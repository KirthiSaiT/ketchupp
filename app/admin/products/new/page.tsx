"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { createProduct } from "@/lib/actions/product.action";
import { getCategories } from "@/lib/actions/category.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CldUpload from "@/components/admin/CldUpload";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dbCategories, setDbCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    comparePrice: "",
    category: "",
    description: "",
    images: [] as string[],
    isBestseller: false,
    isNewProduct: false,
    isUpcoming: false,
  });

  const [sizes, setSizes] = useState([
    { name: "S", stock: 0 },
    { name: "M", stock: 0 },
    { name: "L", stock: 0 },
    { name: "XL", stock: 0 },
    { name: "XXL", stock: 0 }
  ]);

  const isLoaded = React.useRef(false);

  useEffect(() => {
    getCategories().then(data => {
      setDbCategories(data);
    });

    // Load from sessionStorage on mount — set isLoaded synchronously
    const savedForm = sessionStorage.getItem("ketchupp_add_product_form");
    const savedSizes = sessionStorage.getItem("ketchupp_add_product_sizes");
    if (savedForm) setFormData(JSON.parse(savedForm));
    if (savedSizes) setSizes(JSON.parse(savedSizes));

    // Mark as loaded IMMEDIATELY (synchronous, no setTimeout race)
    isLoaded.current = true;
  }, []);

  // Save to sessionStorage whenever state changes — only after initial load
  useEffect(() => {
    if (isLoaded.current) {
      sessionStorage.setItem("ketchupp_add_product_form", JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    if (isLoaded.current) {
      sessionStorage.setItem("ketchupp_add_product_sizes", JSON.stringify(sizes));
    }
  }, [sizes]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.category) {
      toast.error("Please select or create a category first");
      return;
    }
    setLoading(true);

    setLoading(true);

    const formattedData = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: Number(formData.price),
      comparePrice: formData.comparePrice ? Number(formData.comparePrice) : undefined,
      category: formData.category,
      description: formData.description,
      images: formData.images.length > 0 ? formData.images : ["https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=80"],
      colors: ["Standard"],
      sizes: sizes,
      isBestseller: formData.isBestseller,
      isNewProduct: formData.isNewProduct,
      isUpcoming: formData.isUpcoming,
    };

    const res = await createProduct(formattedData);
    if (res.success) {
      toast.success("Product created successfully!");
      // Clear persistence
      sessionStorage.removeItem("ketchupp_add_product_form");
      sessionStorage.removeItem("ketchupp_add_product_sizes");
      
      router.push("/admin/products");
      router.refresh();
    } else {
      toast.error("Failed: " + res.error);
    }
    setLoading(false);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 bg-white rounded-full border border-[#DDD8CE] hover:bg-[#EDE8E0] transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </Link>
          <h1 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-playfair)" }}>Create Product</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6 border border-[#DDD8CE] shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#1A1A1A] border-b border-[#DDD8CE] pb-2">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-1.5 block">Product Name *</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-1.5 block">Slug / URL (Optional)</label>
              <input name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. onyx-bomber-jacket" className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-1.5 block">Price (₹) *</label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-1.5 block">Compare Price</label>
              <input type="number" name="comparePrice" value={formData.comparePrice} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-1.5 block">Category *</label>
              <div className="flex gap-2">
                <select 
                  required 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]"
                >
                  <option value="" disabled>Select Category</option>
                  {dbCategories.map(cat => (
                    <option key={cat._id} value={cat.slug}>{cat.name}</option>
                  ))}
                  {dbCategories.length === 0 && <option value="">No categories found</option>}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap items-end gap-4 pb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" name="isBestseller" checked={formData.isBestseller} onChange={handleChange} className="w-4 h-4 rounded text-[#C1121F] border-[#DDD8CE] ring-offset-0 focus:ring-0" />
                <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#C1121F] transition-colors uppercase tracking-widest">Bestseller</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" name="isNewProduct" checked={formData.isNewProduct} onChange={handleChange} className="w-4 h-4 rounded text-[#C1121F] border-[#DDD8CE] ring-offset-0 focus:ring-0" />
                <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#C1121F] transition-colors uppercase tracking-widest">New</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" name="isUpcoming" checked={formData.isUpcoming} onChange={handleChange} className="w-4 h-4 rounded text-[#C1121F] border-[#DDD8CE] ring-offset-0 focus:ring-0" />
                <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#C1121F] transition-colors uppercase tracking-widest">Upcoming</span>
              </label>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-1.5 block">Description *</label>
            <textarea required rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" />
          </div>
        </div>



        {/* Inventory */}
        <div className="bg-white rounded-2xl p-6 border border-[#DDD8CE] shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#1A1A1A] border-b border-[#DDD8CE] pb-2">Size & Inventory</h2>
          <p className="text-[10px] text-[#8B8580] uppercase font-bold tracking-widest">Set stock for each size</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {sizes.map((s, idx) => (
              <div key={idx} className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#DDD8CE] flex flex-col items-center">
                <span className="text-sm font-black text-[#1A1A1A] mb-2">{s.name}</span>
                <input 
                  type="number" 
                  value={s.stock} 
                  onChange={(e) => {
                    const newSizes = [...sizes];
                    newSizes[idx].stock = Number(e.target.value);
                    setSizes(newSizes);
                  }} 
                  className="w-full px-2 py-1.5 bg-white border border-[#DDD8CE] rounded-lg focus:outline-none focus:border-[#C1121F] text-center text-sm font-bold" 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#DDD8CE] shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#1A1A1A] border-b border-[#DDD8CE] pb-2 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#8B8580]" /> Product Images
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {formData.images.map((url, index) => (
              <CldUpload 
                key={index}
                value={url}
                onUpload={(newUrl) => {
                  setFormData(prev => {
                    const newImages = [...prev.images];
                    newImages[index] = newUrl;
                    return { ...prev, images: newImages };
                  });
                }}
                onRemove={() => {
                  setFormData(prev => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== index),
                  }));
                }}
              />
            ))}
            <CldUpload 
              onUpload={(url) => setFormData(prev => ({ ...prev, images: [...prev.images, url] }))}
            />
          </div>
          <p className="text-[10px] text-[#8B8580] font-bold uppercase tracking-widest">
            Upload one or more high-quality product images.
          </p>
        </div>

        <div className="flex justify-end gap-3 pb-20">
          <Button type="button" variant="outline" className="rounded-xl font-bold px-8 py-6 border-[#DDD8CE]" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={loading} className="rounded-xl px-10 py-6 font-bold bg-[#C1121F] hover:bg-[#a01019] text-white flex items-center gap-2 shadow-lg shadow-[#C1121F]/20">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {loading ? "Saving..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
