import type { ObjectId } from "mongodb";

export type Donation = {
    _id: ObjectId;
    donatorId: ObjectId;
    type: DonationType;
    value: number;
    notes: string;
};

export type DonationType = "כספים" | "פריטי יד שנייה" | "מוצרי מזון" | "שירות";

export type DonationsFormType = Omit<Donation, "_id" | "donatorId">;