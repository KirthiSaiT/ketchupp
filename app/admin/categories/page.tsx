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
  const [adding, setAdding] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", image: "" });

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    const res = await createCategory(newCat);
    if (res.success) {
      toast.success("Category added!");
      setNewCat({ name: "", image: "" });
      loadCategories();
    } else {
      toast.error(res.error);
    }
    setAdding(false);
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Section */}
        <div className="bg-white rounded-3xl p-6 border border-[#DDD8CE] shadow-sm h-fit sticky top-8">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#C1121F]" /> Add New Category
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-1.5 block">Category Name</label>
              <input 
                required 
                value={newCat.name}
                onChange={e => setNewCat({...newCat, name: e.target.value})}
                placeholder="e.g. Jackets" 
                className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#DDD8CE] rounded-xl text-sm focus:outline-none focus:border-[#C1121F]" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-3 block">Category Image</label>
              <CldUpload 
                value={newCat.image} 
                onUpload={(url) => setNewCat({ ...newCat, image: url })}
                onRemove={() => setNewCat({ ...newCat, image: "" })}
              />
            </div>
            <Button disabled={adding} type="submit" className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white rounded-xl py-6 font-bold">
              {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Category"}
            </Button>
          </form>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
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
    </div>
  );
}
