// Local components
import { IArticle } from "./article";
import { Customer } from "./customer";

export interface Order {
  _id?: string;
  owner: string;
  customer: Customer;
  articles: IArticle[];
  address: string;
  valuta: string;
  createdAt: Date;
}
