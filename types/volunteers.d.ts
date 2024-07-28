import type { ObjectId } from "mongodb";
import { Gender } from "./genders";
import { Person } from "./person";

export type Volunteer = Person & {
  preference: VolunteerPreference;
};

export type VolunteerPreference = "נהג" | "אריזה" | "חלוקה";
