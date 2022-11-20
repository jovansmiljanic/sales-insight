// Vendor types
import type { PopulatedDoc } from "mongoose";

// Vendors
import mongoose from "mongoose";

export interface IArticle {
  _id?: mongoose.Types.ObjectId;
  name: string;
  quantity: string;
  price: string;
}

export interface Article {
  name: string;
  articleId: string;
  article: PopulatedDoc<Article>;
}
