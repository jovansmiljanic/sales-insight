// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    owner: { type: String, required: true },
    customer: { type: Object, required: true },
    articles: { type: Array, required: true },
    address: { type: String, required: true },
    valuta: { type: String, required: true },
  },
  { collection: "Orders", timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model("Order", Schema);
