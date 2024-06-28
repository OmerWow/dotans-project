export type Event = {
  _id: string;
  name: string;
  date: Date;
  kind: EventKind;
  status: EventStatus;
  notes: string;
  // volunteers: Volunteer[];
  // families: Family[];
};

export type EventStatus = "מתבצע" | "הוקפא" | "הסתיים";

export type EventKind = "חלוקה" | "איסוף";
