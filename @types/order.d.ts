// Vendor types
import type { PopulatedDoc } from "mongoose";

// Local components
import { IArticle } from "./article";
import { Customer } from "./customer";

export interface Order {
  owner: string;
  customer: Customer;
  articles: IArticle[];
  address: string;
  valuta: string;
  createdAt: Date;
  order: PopulatedDoc<Order>;
}