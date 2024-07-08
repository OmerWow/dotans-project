import type { ObjectId } from "mongodb";
import { Gender } from "./genders";

export type Donator = {
  _id: ObjectId;
  idNumber: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  address: string;
  phone: string;
  email: string;
  donationType: Donation;
};

export type Donation = "כספים" | "פריטי יד שנייה" | "מוצרי מזון" | "שירות";
