"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, LayoutGrid, Image as ImageIcon, Loader2 } from "lucide-react";
import { getCategories, createCategory, deleteCategory } from "@/lib/actions/category.action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CldUpload from "@/components/admin/CldUpload";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  }


  async function handleDelete(id: string) {
    if (!confirm("Are you sure? Products in this category will not be deleted, but they will point to a non-existent category.")) return;
    const res = await deleteCategory(id);
    if (res.success) {
      toast.success("Deleted");
      loadCategories();
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-playfair)" }}>Categories</h1>
      </div>

      <div className="w-full space-y-4">
          {loading ? (
            <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-[#8B8580]" /></div>
          ) : categories.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-[#DDD8CE] text-center">
              <LayoutGrid className="w-12 h-12 text-[#DDD8CE] mx-auto mb-4" />
              <p className="text-[#8B8580]">No categories defined yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div key={cat._id} className="bg-white rounded-2xl p-4 border border-[#DDD8CE] shadow-sm group relative flex items-center gap-4">
                  <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-[#FAF7F2] flex-none">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1A1A1A]">{cat.name}</h3>
                    <p className="text-xs text-[#8B8580] uppercase tracking-widest">{cat.slug}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(cat._id)}
                    className="p-2 text-[#8B8580] hover:text-[#C1121F] hover:bg-[#C1121F]/10 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
