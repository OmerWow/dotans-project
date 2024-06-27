export type Event = {
    id: string;
    name: string;
    date: Date;
    kind: EventKind;
    status: EventStatus;
    notes: string;
    // volunteers: Volunteer[];
    // families: Family[];
};

type EventStatus = 'מתבצע' | 'הוקפא' | 'הסתיים';

type EventKind = "חלוקה" | "איסוף";