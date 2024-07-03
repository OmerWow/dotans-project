import type { ObjectId } from "mongodb";

export type Event = {
  _id: ObjectId;
  name: string;
  date: Date;
  kind: EventKind;
  status: EventStatus;
  notes: string;
  volunteers: ObjectId[];
  families: ObjectId[];
};

export type EventStatus = "מתבצע" | "הוקפא" | "הסתיים";

export type EventKind = "חלוקה" | "איסוף";
