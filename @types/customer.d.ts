// Vendor types
import type { PopulatedDoc } from "mongoose";

export interface Customer {
  name: string;
  customerId: string;
  pib: string;
  customer: PopulatedDoc<Customer>;
}
