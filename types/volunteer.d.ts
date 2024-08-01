import type { ObjectId } from "mongodb";
import { Gender } from "./gender";
import { Person } from "./person";

export type Volunteer = Omit<Person, "birthDate"> & {
  preference: VolunteerPreference;
};

export type VolunteerPreference = "נהג" | "אריזה" | "חלוקה";
