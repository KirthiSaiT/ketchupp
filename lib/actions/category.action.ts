"use server";
import { revalidatePath } from "next/cache";
import { connectDB } from "../db";
import { Category } from "../models/Category";

export async function getCategories() {
  try {
    await connectDB();
    const categories = await Category.find({}).sort({ createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function createCategory(data: { name: string; image: string }) {
  try {
    await connectDB();
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const category = await Category.create({ ...data, slug });
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return { success: true, category: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    console.error("Error creating category:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    await connectDB();
    await Category.findByIdAndDelete(id);
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return { success: false, error: error.message };
  }
}
