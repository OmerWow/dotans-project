import type { ObjectId } from "mongodb";

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

export type Gender = "זכר" | "נקבה" | "אחר";

export type VolunteerPreference = "נהג" | "אריזה" | "חלוקה";
