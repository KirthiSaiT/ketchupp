"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CldUploadProps {
  onUpload: (url: string) => void;
  value?: string;
  onRemove?: () => void;
}

export default function CldUpload({ onUpload, value, onRemove }: CldUploadProps) {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-[#DDD8CE]">
            <Image
              src={value}
              alt="Upload"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <CldUploadWidget
            onSuccess={(result: any) => {
              onUpload(result.info.secure_url);
            }}
            uploadPreset="ketchupp_unsigned" // Default preset name
            options={{
              maxFiles: 1,
              resourceType: "image",
              clientAllowedFormats: ["webp", "png", "jpg", "jpeg"],
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-40 h-40 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#DDD8CE] rounded-2xl hover:bg-[#FAF7F2] hover:border-[#1A1A1A] transition-all group"
              >
                <ImagePlus className="w-8 h-8 text-[#8B8580] group-hover:text-[#1A1A1A]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B8580] group-hover:text-[#1A1A1A]">
                  Upload Image
                </span>
              </button>
            )}
          </CldUploadWidget>
        )}
      </div>
    </div>
  );
}
