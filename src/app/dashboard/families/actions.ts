"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import clientPromise from "../../../../lib/mongodb";
import {
  Family,
  FamilyContact,
  FamilyPreference,
} from "../../../../types/families";
import { Gender } from "../../../../types/genders";

export async function getAllFamilies() {
  return (await clientPromise
    .collection("families")
    .find()
    .toArray()) as unknown as Family[];
}

export async function getFamilyById(_id: ObjectId) {
  return (await clientPromise
    .collection("families")
    .findOne({ _id })) as unknown as Family;
}

export async function addOrUpdateFamily(prevState: string, formData: FormData) {
  const _id = new ObjectId(formData.get("_id") as string);

  const contact: FamilyContact = {
    idNumber: formData.get("contactIdNumber") as string,
    firstName: formData.get("contactFirstName") as string,
    lastName: formData.get("contactLastName") as string,
    gender: formData.get("contactGender") as Gender,
    birthDate: new Date(formData.get("contactBirthDate") as string),
  };

  const family: Family = {
    _id,
    contact,
    numberOfPeople: Number(formData.get("numberOfPeople")),
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    preference: formData.get("preference") as FamilyPreference,
    familiarWithWelfare: formData.get("familiarWithWelfare") === "yes",
  };

  if (await getFamilyById(_id)) {
    await clientPromise
      .collection("families")
      .updateOne({ _id }, { $set: family });

    return redirect("/dashboard/families");
  }

  await clientPromise.collection("families").insertOne(family);

  return redirect("/dashboard/families");
}
