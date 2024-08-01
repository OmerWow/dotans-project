import type { ObjectId } from "mongodb";
import { Gender } from "./gender";
import type { Person } from "./person";

export type Donator = Person & {
  notes: string;
  donationType: Donation;
};

export type Donation = "כספים" | "פריטי יד שנייה" | "מוצרי מזון" | "שירות";
