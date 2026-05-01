import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  images: string[];
  colors: string[];
  sizes: { name: string; stock: number }[];
  fabric?: string;
  care?: string;
  isBestseller: boolean;
  isNewProduct: boolean;
  isFeatured: boolean;
  isUpcoming: boolean;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: Number,
    category: { type: String, required: true },
    images: [{ type: String }],
    colors: [{ type: String }],
    sizes: [{ name: String, stock: Number }],
    fabric: String,
    care: String,
    isBestseller: { type: Boolean, default: false },
    isNewProduct: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isUpcoming: { type: Boolean, default: false },
    tags: [String],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>("Product", ProductSchema);
