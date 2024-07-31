import type { ObjectId } from "mongodb";
import { Gender } from "./genders";
import type { Person } from "./person";

export type Donator = Person & {
  birthDate: Date;
  notes: string;
  donationType: Donation;
};

export type Donation = "כספים" | "פריטי יד שנייה" | "מוצרי מזון" | "שירות";
