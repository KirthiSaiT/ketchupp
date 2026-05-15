"use server";
import { connectDB } from "../db";
import { Order } from "../models/Order";

import { sendOrderConfirmationEmail } from "./email.action";

export async function createOrder(orderData: any) {
  try {
    await connectDB();
    const order = await Order.create(orderData);
    
    // Trigger real email via Resend
    const emailRes = await sendOrderConfirmationEmail({
      orderId: order._id.toString(),
      customerName: order.shipping.name,
      customerEmail: orderData.userEmail || order.shipping.email || "customer@example.com",
      total: order.total,
      items: order.items,
      shippingAddress: order.shipping
    });

    return { success: true, orderId: order._id.toString() };
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserOrders(userId: string) {
  try {
    await connectDB();
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return [];
  }
}
