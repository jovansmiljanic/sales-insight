// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    customerId: { type: String },
    pib: { type: String, required: true },
  },
  { collection: "Customers", timestamps: true }
);

export const Customer =
  mongoose.models.Customer || mongoose.model("Customer", Schema);
