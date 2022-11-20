// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    quantity: { type: String, required: true },
  },
  { collection: "Articles", timestamps: true }
);

export const Article =
  mongoose.models.Article || mongoose.model("Article", Schema);
