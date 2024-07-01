import type { ObjectId } from "mongodb";
import { Gender } from "./genders";

export type Volunteer = {
  _id: ObjectId;
  idNumber: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  phone: string;
  email: string;
  address: string;
  preference: VolunteerPreference;
};

export type VolunteerPreference = "נהג" | "אריזה" | "חלוקה";
