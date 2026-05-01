"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, Loader2 } from "lucide-react";
import { deleteProduct } from "@/lib/actions/product.action";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProductActionsProps {
  productId: string;
  productName: string;
}

export default function ProductActions({ productId, productName }: ProductActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const res = await deleteProduct(productId);
    if (res.success) {
      toast.success(`${productName} deleted successfully`);
    } else {
      toast.error(`Failed to delete: ${res.error}`);
    }
    setIsDeleting(false);
    setShowConfirm(false);
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/products/${productId}/edit`}
        className="p-2 text-[#8B8580] hover:text-[#1A1A1A] hover:bg-[#EDE8E0] rounded-lg transition-colors"
      >
        <Edit2 className="w-4 h-4" />
      </Link>
      
      <button
        onClick={() => setShowConfirm(true)}
        className="p-2 text-[#8B8580] hover:text-[#C1121F] hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="rounded-3xl bg-[#FAF7F2] border-none max-w-sm sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-playfair)" }}>
              Delete Product?
            </DialogTitle>
            <DialogDescription className="text-[#8B8580] text-sm">
              Are you sure you want to delete <span className="font-bold text-[#1A1A1A]">"{productName}"</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              className="rounded-xl border-[#DDD8CE] flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-xl bg-[#C1121F] hover:bg-[#a01019] text-white flex-1 font-bold"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
