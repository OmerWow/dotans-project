import type { ObjectId } from "mongodb";
import { Gender } from "./gender";
import type { Person } from "./person";

export type Family = {
  _id: ObjectId;
  contact: FamilyContact;
  numberOfPeople: number;
  address: string;
  phone: string;
  email: string;
  preference: FamilyPreference;
  familiarWithWelfare: boolean;
};

export type FamilyContact = Omit<Person, "_id", "phone", "email", "address">;

export type FamilyPreference = "כרטיס" | "משלוח";
