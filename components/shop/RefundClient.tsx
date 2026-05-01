"use client";
import React, { useState } from "react";
import { AlertCircle, Upload, CheckCircle2, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function RefundClient() {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] py-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-[#DDD8CE] text-center shadow-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>Request Submitted</h2>
          <p className="text-[#8B8580] mb-8 text-sm leading-relaxed">
            We have received your refund request and the unboxing video. Our team will review the claim and get back to you within 24-48 hours.
          </p>
          <Button onClick={() => window.location.href="/account/orders"} variant="outline" className="w-full rounded-xl border-[#DDD8CE] py-6">
            Return to My Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Refund Request
          </h1>
          <p className="text-[#8B8580] max-w-lg mx-auto">
            We're sorry your order didn't work out. Please fill out the form below to initiate a return.
          </p>
        </div>

        {/* Mandatory Notice */}
        <div className="bg-[#C1121F]/10 border border-[#C1121F]/20 rounded-2xl p-6 mb-10 flex gap-4 items-start">
          <AlertCircle className="w-6 h-6 text-[#C1121F] flex-none mt-0.5" />
          <div>
            <h3 className="font-bold text-[#C1121F] mb-1">Unboxing Video is Mandatory</h3>
            <p className="text-sm text-[#C1121F]/80 leading-relaxed">
              To protect both parties and ensure fair claims, an unboxing video is <span className="font-bold underline">strictly required</span> for all missing item or damage claims. The video must show the sealed package being opened for the first time.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-3xl p-6 md:p-8 border border-[#DDD8CE] shadow-sm space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Order Number</label>
                  <input type="text" placeholder="e.g. KC123456" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#1A1A1A]" required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Email Address</label>
                  <input type="email" placeholder="Used at checkout" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#1A1A1A]" required />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Reason for Refund</label>
                <select className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#1A1A1A]" required>
                  <option value="">Select a reason...</option>
                  <option value="damaged">Item arrived damaged/defective</option>
                  <option value="wrong_item">Received wrong item or size</option>
                  <option value="missing">Part of the order is missing</option>
                  <option value="quality">Not satisfied with quality/fit</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Detailed Description</label>
                <textarea rows={4} placeholder="Please explain the issue in detail..." className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#1A1A1A] resize-y" required></textarea>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Upload Unboxing Video</label>
                <label className={`block w-full border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${file ? 'border-green-500 bg-green-50' : 'border-[#DDD8CE] hover:border-[#1A1A1A] bg-[#FAF7F2]'}`}>
                  <input type="file" accept="video/mp4,video/mov" className="hidden" onChange={handleFileChange} required />
                  {file ? (
                    <div className="flex flex-col items-center">
                      <FileVideo className="w-10 h-10 text-green-500 mb-3" />
                      <p className="font-bold text-[#1A1A1A] text-sm">{file.name}</p>
                      <p className="text-xs text-[#8B8580] mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB • Click to replace</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                        <Upload className="w-5 h-5 text-[#C1121F]" />
                      </div>
                      <p className="font-bold text-[#1A1A1A] text-sm mb-1">Click to upload video</p>
                      <p className="text-xs text-[#8B8580]">MP4 or MOV up to 50MB</p>
                    </div>
                  )}
                </label>
              </div>

              <Button type="submit" className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white rounded-xl py-6 font-bold text-base mt-4">
                Submit Request
              </Button>
            </form>
          </div>

          {/* Guidelines sidebar */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-[#1A1A1A] text-lg mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Refund Policy Guidelines</h3>
            
            <Accordion className="bg-white rounded-3xl border border-[#DDD8CE] overflow-hidden">
              <AccordionItem value="video" className="px-5 border-b border-[#DDD8CE]">
                <AccordionTrigger className="text-sm font-bold text-[#1A1A1A] hover:no-underline py-5">
                  How to record the video?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#8B8580] pb-5">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Show the shipping label clearly before opening.</li>
                    <li>The package must be sealed when recording starts.</li>
                    <li>Record in one continuous take without cuts.</li>
                    <li>Show all items removed from the package.</li>
                    <li>Highlight the defect clearly in the video.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="timeline" className="px-5 border-b border-[#DDD8CE]">
                <AccordionTrigger className="text-sm font-bold text-[#1A1A1A] hover:no-underline py-5">
                  Timeline
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#8B8580] pb-5">
                  You must raise a request within <strong>7 days</strong> of delivery. Once verified (24-48 hrs), refunds to original payment methods take 3-5 business days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="exceptions" className="px-5 border-none">
                <AccordionTrigger className="text-sm font-bold text-[#1A1A1A] hover:no-underline py-5">
                  Non-refundable Items
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#8B8580] pb-5">
                  Underwear, socks, swimwear, and clearance sale items (50% off or more) are strictly non-refundable and non-exchangeable due to hygiene and pricing reasons.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </div>
  );
}
