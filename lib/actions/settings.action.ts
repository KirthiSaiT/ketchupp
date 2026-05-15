"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../db";
import { StoreSettings } from "../models/StoreSettings";

export async function getStoreSettings() {
  try {
    await connectDB();
    let settings = await StoreSettings.findOne().lean();
    
    if (!settings) {
      settings = await StoreSettings.create({});
    }
    
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

export async function updateStoreSettings(data: any) {
  try {
    await connectDB();
    const settings = await StoreSettings.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
    }).lean();
    
    revalidatePath("/");
    revalidatePath("/upcoming");
    return { success: true, settings: JSON.parse(JSON.stringify(settings)) };
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return { success: false, error: error.message };
  }
}
