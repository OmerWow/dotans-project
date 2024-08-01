import type { ObjectId } from "mongodb";
import { Gender } from "./gender";

export type Person = {
    _id: ObjectId;
    idNumber: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    phone: string;
    email: string;
    address: string;
    birthDate: Date;
};