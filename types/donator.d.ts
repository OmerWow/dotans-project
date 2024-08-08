import type { ObjectId } from "mongodb";
import type { Person } from "./person";

export type Donator = Person & {
  donations: ObjectId[];
};