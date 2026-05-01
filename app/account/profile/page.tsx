"use client";
import React from "react";
import { UserProfile, useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <div className="h-40 flex items-center justify-center text-[#8B8580]">Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 border-b border-[#DDD8CE] pb-4" style={{ fontFamily: "var(--font-playfair)" }}>
        Profile Details
      </h2>
      
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#DDD8CE]">
        {/* We use Clerk's pre-built UserProfile component, styled slightly to match the theme */}
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none p-0 w-full rounded-none m-0",
              navbar: "hidden",
              pageScrollBox: "p-6",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              badge: "bg-[#FFD60A] text-[#1A1A1A]",
              formButtonPrimary: "bg-[#1A1A1A] hover:bg-[#333] text-white",
              profileSectionTitleText: "text-[#1A1A1A] font-bold text-lg border-b border-[#DDD8CE] pb-2 mb-4",
              accordionTriggerButton: "text-[#1A1A1A]",
              avatarImageActionsUpload: "text-[#C1121F]",
            }
          }}
        />
      </div>
    </div>
  );
}
