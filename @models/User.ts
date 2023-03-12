// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: Number, default: 2 },
  },
  { collection: "Users", timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", Schema);
