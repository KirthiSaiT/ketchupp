"use server";
import { revalidatePath } from "next/cache";
import { connectDB } from "../db";
import { Product } from "../models/Product";

export async function getBestsellers() {
  try {
    await connectDB();
    const products = await Product.find({ isBestseller: true }).limit(8).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching bestsellers:", error);
    return [];
  }
}

export async function getAllProducts(category?: string, sort?: string) {
  try {
    await connectDB();
    
    let query: any = {};
    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }
    
    let sortObj: any = { createdAt: -1 };
    if (sort === 'price-asc') sortObj = { price: 1 };
    if (sort === 'price-desc') sortObj = { price: -1 };
    if (sort === 'rating') sortObj = { rating: -1 };

    const products = await Product.find(query).sort(sortObj).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug }).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getRelatedProducts(category: string, currentSlug: string) {
  try {
    await connectDB();
    const products = await Product.find({ 
      category: { $regex: new RegExp(`^${category}$`, "i") }, 
      slug: { $ne: currentSlug } 
    }).limit(4).lean();
    
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export async function createProduct(data: any) {
  try {
    await connectDB();
    
    // ── Handle Slug Collision ──
    let slug = data.slug;
    const existing = await Product.findOne({ slug });
    if (existing) {
      // Append a small random string to make it unique
      slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
      data.slug = slug;
    }

    const product = await Product.create(data);
    revalidatePath("/products");
    revalidatePath("/");
    revalidatePath("/admin/products");
    return { success: true, product: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    await connectDB();
    const updated = await Product.findByIdAndUpdate(id, data, { new: true }).lean();
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true, product: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error('Error updating product:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message };
  }
}
