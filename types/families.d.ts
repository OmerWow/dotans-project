import type { ObjectId } from "mongodb";
import { Gender } from "./genders";

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

export type FamilyContact = {
  idNumber: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
};

export type FamilyPreference = "כרטיס" | "משלוח";
