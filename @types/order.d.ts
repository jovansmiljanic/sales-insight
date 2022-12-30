// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

// Local components
import { IArticle } from "./article";
import { Customer } from "./customer";

export interface Order {
  _id?: mongoose.Types.ObjectId;
  owner: string;
  customer: Customer;
  articles: IArticle[];
  address: string;
  valuta: string;
  createdAt: Date;
  order: PopulatedDoc<Order>;
}
