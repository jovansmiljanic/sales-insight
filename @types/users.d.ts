// Vendor types
import type { PopulatedDoc } from "mongoose";

export type UserRoles = 1 | 2;

export interface User {
  _id?: mongoose.Types.ObjectId;
  userName: string;
  password: string;
  role: UserRoles;
  user: PopulatedDoc<User>;
}
