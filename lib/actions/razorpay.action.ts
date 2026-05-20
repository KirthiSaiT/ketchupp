"use server";

import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize instance safely
const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keyId || !keySecret) {
    console.warn("Razorpay API Keys are missing in .env config");
  }
  
  return new Razorpay({
    key_id: keyId || "mock_key_id",
    key_secret: keySecret || "mock_key_secret",
  });
};

export async function initiateRazorpayOrder(amountInINR: number) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!keyId || !keySecret) {
      return { 
        success: false, 
        error: "Razorpay API keys are not configured. Please supply RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." 
      };
    }

    const razorpay = getRazorpayInstance();
    const options = {
      amount: Math.round(amountInINR * 100), // paise conversion
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    };

    const order = await razorpay.orders.create(options);
    
    return { 
      success: true, 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency,
      keyId: keyId
    };
  } catch (error: any) {
    console.error("Razorpay Order Initiation Error:", error);
    return { 
      success: false, 
      error: error.message || "Failed to initiate payment sequence." 
    };
  }
}

export async function verifyRazorpaySignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return { success: false, error: "Razorpay Secret Key is not configured." };
    }

    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpaySignature;
    return { success: isValid };
  } catch (error: any) {
    console.error("Razorpay Verification Error:", error);
    return { success: false, error: error.message || "Signature verification failed." };
  }
}
