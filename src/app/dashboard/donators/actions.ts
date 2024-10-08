"use server";

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import clientPromise from "../../../../lib/mongodb";
import type { Donator } from "../../../../types/donator";
import type { Gender } from "../../../../types/gender";
import type { Donation } from "../../../../types/donation";

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

export async function getDonationsByDonatorId(donatorId: ObjectId) {
  return (await clientPromise
    .collection("donations")
    .find({ donatorId })
    .toArray()) as unknown as Donation[];
}

export async function addOrUpdateDonator(
  prevState: string,
  formData: FormData,
) {
  const donatorId = new ObjectId(formData.get("_id") as string);

  const donations: Donation[] = (formData
    .getAll("donations") as string[])
    .map((donation) => JSON.parse(donation));

  const donationsToAdd = donations
    .filter((donation) => !donation._id)
    .map((donation) => {
      donation._id = new ObjectId();
      donation.donatorId = donatorId;

      return donation;
    });

  if (donationsToAdd.length) {
    await clientPromise.collection("donations").insertMany(donationsToAdd);
  }

  const existingDonations = await clientPromise
    .collection("donations")
    .find({ donatorId })
    .toArray();

  const donationsToDelete = existingDonations
    .filter((existingDonation) => !donations.some((donation) => donation._id && donation._id.toString() === existingDonation._id.toString()))
    .map((donation) => donation._id);

  if (donationsToDelete.length) {
    await clientPromise.collection("donations").deleteMany({ _id: { $in: donationsToDelete } });
  }

  const donator: Donator = {
    _id: donatorId,
    idNumber: formData.get("idNumber") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    gender: formData.get("gender") as Gender,
    birthDate: new Date(formData.get("birthDate") as string),
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    donations: donations.map((donation) => new ObjectId(donation._id)),
  };

  await clientPromise
    .collection("donators")
    .updateOne({ _id: donatorId }, { $set: donator }, { upsert: true });

  return redirect("/dashboard/donators");
}
