import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  items: {
    productId: string;
    name: string;
    image: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  shipping: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    type: "home" | "post-office";
  };
  payment: {
    method: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    status: "pending" | "paid" | "failed";
  };
  status: "processing" | "shipped" | "out-for-delivery" | "delivered" | "cancelled" | "refund-requested" | "refunded";
  subtotal: number;
  shippingCharge: number;
  total: number;
  trackingNumber?: string;
  refundVideo?: string;
  refundReason?: string;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    items: [
      {
        productId: String,
        name: String,
        image: String,
        size: String,
        color: String,
        quantity: Number,
        price: Number,
      },
    ],
    shipping: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      type: { type: String, enum: ["home", "post-office"] },
    },
    payment: {
      method: String,
      razorpayOrderId: String,
      razorpayPaymentId: String,
      status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    },
    status: {
      type: String,
      enum: ["processing", "shipped", "out-for-delivery", "delivered", "cancelled", "refund-requested", "refunded"],
      default: "processing",
    },
    subtotal: Number,
    shippingCharge: { type: Number, default: 0 },
    total: Number,
    trackingNumber: String,
    refundVideo: String,
    refundReason: String,
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model<IOrder>("Order", OrderSchema);
