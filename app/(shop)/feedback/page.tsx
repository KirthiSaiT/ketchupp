"use client";
import React, { useState } from "react";
import { Star, Upload, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (submitted) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] py-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-[#DDD8CE] text-center shadow-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>Thank You!</h2>
          <p className="text-[#8B8580] mb-8 text-sm leading-relaxed">
            Your feedback means the world to us. It helps us improve the Ketchupp archive and deliver better garments.
          </p>
          <Button onClick={() => window.location.href="/"} className="w-full bg-[#1A1A1A] text-white hover:bg-[#333] rounded-xl py-6">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 lg:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-5">
            <MessageSquare className="w-7 h-7 text-[#FFD60A]" />
          </div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Share Your Experience
          </h1>
          <p className="text-[#8B8580]">
            We're constantly striving to evolve. Let us know how we did.
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-3xl p-6 md:p-10 border border-[#DDD8CE] shadow-sm space-y-8">
          
          {/* Star Rating */}
          <div className="text-center">
            <label className="text-sm font-bold text-[#1A1A1A] mb-3 block">Overall Rating</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 p-1"
                >
                  <Star 
                    className={`w-10 h-10 ${(hoverRating || rating) >= star ? 'fill-[#FFD60A] text-[#FFD60A]' : 'text-[#DDD8CE]'}`} 
                  />
                </button>
              ))}
            </div>
            {rating === 0 && <p className="text-xs text-[#C1121F] mt-2 hidden" id="rating-error">Please select a rating</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Name</label>
              <input type="text" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" required />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">What did you love (or hate)?</label>
            <textarea rows={5} placeholder="Tell us about the fabric, the fit, the delivery..." className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F] resize-y" required></textarea>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block flex items-center justify-between">
              Attach a Photo <span className="font-normal normal-case text-[#8B8580]">(Optional)</span>
            </label>
            <div className="border-2 border-dashed border-[#DDD8CE] rounded-xl p-5 text-center flex flex-col items-center justify-center hover:bg-[#FAF7F2] transition-colors cursor-pointer">
              <Upload className="w-5 h-5 text-[#8B8580] mb-2" />
              <span className="text-xs font-semibold text-[#1A1A1A]">Upload an image</span>
            </div>
          </div>

          <Button type="submit" disabled={rating === 0} className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white rounded-xl py-6 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            Submit Feedback
          </Button>

        </form>
      </div>
    </div>
  );
}
