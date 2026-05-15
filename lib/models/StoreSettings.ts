import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStoreSettings extends Document {
  showUpcoming: boolean;
  upcomingTitle: string;
  upcomingDescription: string;
  upcomingDate: Date;
  updatedAt: Date;
}

const StoreSettingsSchema = new Schema<IStoreSettings>(
  {
    showUpcoming: { type: Boolean, default: false },
    upcomingTitle: { type: String, default: "Season 02 Drop" },
    upcomingDescription: { type: String, default: "The next chapter is almost here. Limited pieces, bold statements." },
    upcomingDate: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  },
  { timestamps: true }
);

export const StoreSettings: Model<IStoreSettings> =
  mongoose.models.StoreSettings ?? mongoose.model<IStoreSettings>("StoreSettings", StoreSettingsSchema);
