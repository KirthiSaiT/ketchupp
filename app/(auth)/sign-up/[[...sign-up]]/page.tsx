import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block text-3xl font-black text-[#1A1A1A] tracking-tight hover:text-[#C1121F] transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
            KETCHUPP
          </a>
          <p className="text-sm text-[#8B8580] mt-2">Join the revolution.</p>
        </div>
        <SignUp appearance={{
          elements: {
            card: "shadow-none border border-[#DDD8CE] rounded-3xl bg-white p-6",
            headerTitle: "text-xl font-bold text-[#1A1A1A]",
            headerSubtitle: "text-[#8B8580]",
            socialButtonsBlockButton: "border-[#DDD8CE] text-[#1A1A1A] hover:bg-[#EDE8E0] rounded-xl",
            dividerLine: "bg-[#DDD8CE]",
            dividerText: "text-[#8B8580]",
            formFieldLabel: "text-[#1A1A1A] font-semibold",
            formFieldInput: "bg-[#FAF7F2] border-[#DDD8CE] rounded-xl text-[#1A1A1A] focus:ring-[#C1121F] focus:border-[#C1121F]",
            formButtonPrimary: "bg-[#1A1A1A] hover:bg-[#333] text-white rounded-xl py-3 font-bold",
            footerActionLink: "text-[#C1121F] hover:text-[#a01019] font-semibold",
          }
        }} />
      </div>
    </div>
  );
}
