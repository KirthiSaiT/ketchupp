"use server";
import { connectDB } from "../db";
import { Order } from "../models/Order";

import { sendMockOrderConfirmation } from "../utils/email";

export async function createOrder(orderData: any) {
  try {
    await connectDB();
    const order = await Order.create(orderData);
    
    // Trigger mock email log
    await sendMockOrderConfirmation({
      orderId: order._id.toString(),
      customerName: order.shippingAddress.name,
      customerEmail: order.userEmail,
      total: order.total,
      items: order.items
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
