"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import clientPromise from "../../../../lib/mongodb";
import { Gender } from "../../../../types/genders";
import { Volunteer, VolunteerPreference } from "../../../../types/volunteers";

export async function getAllVolunteers() {
  return (await clientPromise
    .collection("volunteers")
    .find()
    .toArray()) as unknown as Volunteer[];
}

export async function getVolunteerById(_id: ObjectId) {
  return (await clientPromise
    .collection("volunteers")
    .findOne({ _id })) as unknown as Volunteer;
}

export async function addOrUpdateVolunteer(
  prevState: string,
  formData: FormData,
) {
  const _id = new ObjectId(formData.get("_id") as string);

  const volunteer: Volunteer = {
    _id,
    idNumber: formData.get("idNumber") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    gender: formData.get("gender") as Gender,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    preference: formData.get("preference") as VolunteerPreference,
  };

  if (await getVolunteerById(_id)) {
    await clientPromise
      .collection("volunteers")
      .updateOne({ _id }, { $set: volunteer });

    return redirect("/dashboard/volunteers");
  }

  await clientPromise.collection("volunteers").insertOne(volunteer);

  return redirect("/dashboard/volunteers");
}
