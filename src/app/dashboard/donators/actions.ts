"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import clientPromise from "../../../../lib/mongodb";
import { Donation, Donator } from "../../../../types/donator";
import { Gender } from "../../../../types/genders";

export async function getAllDonators() {
  return (await clientPromise
    .collection("donators")
    .find()
    .toArray()) as unknown as Donator[];
}

export async function getDonatorById(_id: ObjectId) {
  return (await clientPromise
    .collection("donators")
    .findOne({ _id })) as unknown as Donator;
}

export async function addOrUpdateDonator(
  prevState: string,
  formData: FormData,
) {
  const _id = new ObjectId(formData.get("_id") as string);

  const donator: Donator = {
    _id,
    idNumber: formData.get("idNumber") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    gender: formData.get("gender") as Gender,
    birthDate: new Date(formData.get("birthDate") as string),
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    notes: formData.get("notes") as string,
    donationType: formData.get("donationType") as Donation,
  };

  if (await getDonatorById(_id)) {
    await clientPromise
      .collection("donators")
      .updateOne({ _id }, { $set: donator });

    return redirect("/dashboard/donators");
  }

  await clientPromise.collection("donators").insertOne(donator);

  return redirect("/dashboard/donators");
}
