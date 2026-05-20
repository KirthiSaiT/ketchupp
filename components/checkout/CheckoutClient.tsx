"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Lock, MapPin, Truck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUser } from "@clerk/nextjs";
import { createOrder } from "@/lib/actions/order.action";
import { initiateRazorpayOrder, verifyRazorpaySignature } from "@/lib/actions/razorpay.action";
import Script from "next/script";

export default function CheckoutClient() {
  const router = useRouter();
  const { user } = useUser();
  const { items, total, itemCount, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = total >= 999 ? 0 : 99;
  const grandTotal = total + shipping;

  const [shippingData, setShippingData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    deliveryType: "home",
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");

  React.useEffect(() => {
    if (items.length === 0 && step !== 3) {
      router.push("/cart");
    }
  }, [items.length, step, router]);

  if (items.length === 0 && step !== 3) {
    return null;
  }

  function handleShippingSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!shippingData.firstName || !shippingData.address || !shippingData.pincode) {
      toast.error("Please fill all required fields");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handlePayment() {
    setIsProcessing(true);
    try {
      const orderData = {
        userId: user?.id || "guest",
        userEmail: shippingData.email,
        items: items.map(i => ({
          productId: i.id,
          name: i.name,
          image: i.image,
          size: i.size,
          color: i.color || "None",
          quantity: i.quantity,
          price: i.price
        })),
        shipping: {
          name: `${shippingData.firstName} ${shippingData.lastName}`.trim(),
          phone: shippingData.phone,
          address: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          pincode: shippingData.pincode,
          type: shippingData.deliveryType,
        },
        payment: {
          method: paymentMethod,
          status: paymentMethod === "cod" ? "pending" : "paid"
        },
        status: "processing",
        subtotal: total,
        shippingCharge: shipping,
        total: grandTotal
      };

      if (paymentMethod === "cod") {
        const res = await createOrder(orderData);
        if (res.success) {
          setStep(3);
          clearCart();
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          toast.error("Failed to create order: " + res.error);
        }
        setIsProcessing(false);
        return;
      }

      // Razorpay checkout integration
      if (!(window as any).Razorpay) {
        toast.error("Payment gateway is still loading. Please try again in a few seconds.");
        setIsProcessing(false);
        return;
      }

      const initRes = await initiateRazorpayOrder(grandTotal);
      if (!initRes.success) {
        toast.error(initRes.error || "Failed to initiate payment. Please try again.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: initRes.keyId,
        amount: initRes.amount,
        currency: initRes.currency,
        name: "KETCHUPP",
        description: "Secure Archival Purchase",
        image: "/ketchupptop.webp",
        order_id: initRes.orderId,
        handler: async function (response: any) {
          setIsProcessing(true);
          try {
            // Server-side cryptographic HMAC validation
            const verifyRes = await verifyRazorpaySignature(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );

            if (!verifyRes.success) {
              toast.error("Cryptographic signature mismatch! Order security validation failed.");
              setIsProcessing(false);
              return;
            }

            // Save verified order into database
            const finalOrderData = {
              ...orderData,
              payment: {
                method: paymentMethod,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                status: "paid" as const
              }
            };

            const dbRes = await createOrder(finalOrderData);
            if (dbRes.success) {
              setStep(3);
              clearCart();
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              toast.error("Payment verified successfully, but order placement failed: " + dbRes.error);
            }
          } catch (err: any) {
            toast.error("An error occurred during payment verification: " + err.message);
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${shippingData.firstName} ${shippingData.lastName}`.trim(),
          email: shippingData.email,
          contact: shippingData.phone,
        },
        theme: {
          color: "#C1121F",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast("Payment cancelled.");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (e: any) {
      toast.error("An error occurred: " + e.message);
      setIsProcessing(false);
    }
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[
        { num: 1, label: "Shipping" },
        { num: 2, label: "Payment" },
        { num: 3, label: "Confirmation" },
      ].map((s, i) => (
        <React.Fragment key={s.num}>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step === s.num ? "bg-[#1A1A1A] text-[#FAF7F2]" :
              step > s.num ? "bg-[#C1121F] text-white" : "bg-[#EDE8E0] text-[#8B8580]"
            }`}>
              {step > s.num ? <Check className="w-4 h-4" /> : s.num}
            </div>
            <span className={`text-xs font-semibold ${step >= s.num ? "text-[#1A1A1A]" : "text-[#8B8580]"}`}>{s.label}</span>
          </div>
          {i < 2 && (
            <div className={`w-12 sm:w-24 h-0.5 mx-2 -mt-5 ${step > s.num + 0.5 ? "bg-[#C1121F]" : "bg-[#DDD8CE]"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        strategy="lazyOnload" 
      />
      <div className="bg-[#1A1A1A] py-14 mb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#FAF7F2]" style={{ fontFamily: "var(--font-playfair)" }}>
            Checkout
          </h1>
          <p className="text-[#8B8580] mt-2 text-sm flex justify-center items-center gap-1">
            <Lock className="w-4 h-4" /> Secure 256-bit SSL Encryption
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <StepIndicator />

        {step === 3 ? (
          <div className="bg-white rounded-3xl p-10 text-center max-w-xl mx-auto shadow-sm border border-[#DDD8CE]">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Order Confirmed
            </h2>
            <p className="text-[#8B8580] mb-8">
              Thank you for shopping with Ketchupp. Your order <span className="font-bold text-[#1A1A1A]">#KC{Math.floor(Math.random() * 1000000)}</span> is confirmed. We&apos;ve sent a confirmation email to {shippingData.email || "you"}.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/account/orders">
                <Button variant="outline" className="rounded-xl border-[#DDD8CE]">View Order</Button>
              </Link>
              <Link href="/products">
                <Button className="bg-[#1A1A1A] text-white rounded-xl">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Col - Forms */}
            <div className="lg:col-span-3 space-y-6">
              {step === 1 && (
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#DDD8CE]">
                  <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#C1121F]" /> Shipping Address
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">First Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" required value={shippingData.firstName} onChange={e => setShippingData({...shippingData, firstName: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Last Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" required value={shippingData.lastName} onChange={e => setShippingData({...shippingData, lastName: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Email</label>
                        <input type="email" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" required value={shippingData.email} onChange={e => setShippingData({...shippingData, email: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Phone</label>
                        <input type="tel" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" required value={shippingData.phone} onChange={e => setShippingData({...shippingData, phone: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">Address / PO Box</label>
                      <input type="text" placeholder="House no, street, area..." className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" required value={shippingData.address} onChange={e => setShippingData({...shippingData, address: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">PIN Code</label>
                        <input type="text" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" required value={shippingData.pincode} onChange={e => setShippingData({...shippingData, pincode: e.target.value})} />
                      </div>
                      <div className="col-span-1">
                        <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">City</label>
                        <input type="text" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" required value={shippingData.city} onChange={e => setShippingData({...shippingData, city: e.target.value})} />
                      </div>
                      <div className="col-span-1">
                        <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-1.5 block">State</label>
                        <input type="text" className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-[#C1121F]" required value={shippingData.state} onChange={e => setShippingData({...shippingData, state: e.target.value})} />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#DDD8CE]">
                      <label className="text-xs font-semibold text-[#8B8580] uppercase tracking-wide mb-3 flex items-center gap-1">
                        Delivery Method
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger><HelpCircle className="w-3 h-3" /></TooltipTrigger>
                            <TooltipContent>We ship everywhere in India, including rural post offices.</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-colors ${shippingData.deliveryType === 'home' ? 'border-[#C1121F] bg-[#C1121F]/5' : 'border-[#DDD8CE] hover:border-[#1A1A1A]'}`}>
                          <input type="radio" className="accent-[#C1121F]" name="delivery" value="home" checked={shippingData.deliveryType === 'home'} onChange={(e) => setShippingData({...shippingData, deliveryType: e.target.value})} />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#1A1A1A]">Standard Delivery</span>
                            <span className="text-xs text-[#8B8580]">3-5 Business Days</span>
                          </div>
                        </label>
                        <label className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-colors ${shippingData.deliveryType === 'post-office' ? 'border-[#C1121F] bg-[#C1121F]/5' : 'border-[#DDD8CE] hover:border-[#1A1A1A]'}`}>
                          <input type="radio" className="accent-[#C1121F]" name="delivery" value="post-office" checked={shippingData.deliveryType === 'post-office'} onChange={(e) => setShippingData({...shippingData, deliveryType: e.target.value})} />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#1A1A1A]">Post Office Delivery</span>
                            <span className="text-xs text-[#8B8580]">India Post (PO Box)</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white rounded-xl py-6 font-bold text-base mt-2">
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#DDD8CE]">
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#DDD8CE]">
                    <div>
                      <h2 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
                        Payment Method
                      </h2>
                      <p className="text-sm text-[#8B8580] mt-1">All transactions are secure and encrypted.</p>
                    </div>
                    <button onClick={() => setStep(1)} className="text-sm font-semibold text-[#8B8580] hover:text-[#C1121F]">Edit Shipping</button>
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      { id: 'upi', name: 'UPI', desc: 'Google Pay, PhonePe, Paytm' },
                      { id: 'card', name: 'Credit / Debit Card', desc: 'Secure card payment via Razorpay' },
                      { id: 'netbanking', name: 'Net Banking', desc: 'All major Indian banks supported' },
                      { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive the package' },
                    ].map(method => (
                      <label key={method.id} className={`cursor-pointer border rounded-xl p-4 flex items-center gap-4 transition-colors ${paymentMethod === method.id ? 'border-[#C1121F] bg-[#C1121F]/5' : 'border-[#DDD8CE] hover:border-[#1A1A1A]'}`}>
                        <input type="radio" className="accent-[#C1121F] w-4 h-4" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#1A1A1A]">{method.name}</span>
                          <span className="text-xs text-[#8B8580]">{method.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs p-4 rounded-xl mb-6 flex items-start gap-2">
                    <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Secure Gateway:</strong> Payments are processed via Razorpay. Your credentials and transaction data are fully encrypted (SSL 256-bit).
                    </div>
                  </div>

                  <Button onClick={handlePayment} disabled={isProcessing} className="w-full bg-[#FFD60A] hover:bg-[#e6c000] text-[#1A1A1A] rounded-xl py-6 font-bold text-base flex items-center justify-center gap-2">
                    {isProcessing ? 'Processing Payment...' : `Pay ₹${grandTotal.toLocaleString("en-IN")}`}
                    {!isProcessing && <Lock className="w-4 h-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* Right Col - Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#DDD8CE] sticky top-24">
                <h3 className="font-bold text-[#1A1A1A] mb-4 text-lg">Order Summary</h3>
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <div className="relative w-16 h-20 flex-none rounded-lg overflow-hidden bg-[#EDE8E0] border border-[#DDD8CE]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute -top-2 -right-2 bg-[#8B8580] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-semibold text-[#1A1A1A] line-clamp-1">{item.name}</p>
                        <p className="text-[#8B8580] text-xs mt-0.5">Size: {item.size}</p>
                        <p className="font-bold text-[#C1121F] mt-1">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-5 border-t border-[#DDD8CE] pt-5">
                  <div className="flex justify-between text-sm text-[#8B8580]">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#8B8580]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-[#1A1A1A] text-xl border-t border-[#1A1A1A] pt-5">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
