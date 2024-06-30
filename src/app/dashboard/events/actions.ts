"use server";

import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";
import type { Event, EventKind, EventStatus } from "../../../../types/events";
import { redirect } from "next/navigation";

export async function getAllEvents() {
  return (await clientPromise
    .collection("events")
    .find()
    .toArray()) as unknown as Event[];
}

export async function getEventById(_id: ObjectId) {
  return (await clientPromise
    .collection("events")
    .findOne({ _id })) as unknown as Event;
}

export async function addOrUpdateEvent(prevState: string, formData: FormData) {
  const _id = new ObjectId(formData.get("_id") as string);

  const event: Event = {
    _id,
    name: formData.get("name") as string,
    date: new Date(formData.get("dateAndTime") as string),
    kind: formData.get("eventKind") as EventKind,
    status: formData.get("eventStatus") as EventStatus,
    notes: formData.get("notes") as string,
    volunteers: formData.getAll("volunteers") as unknown as ObjectId[],
  };

  if (await getEventById(_id)) {
    await clientPromise
      .collection("events")
      .updateOne({ _id }, { $set: event });

    return redirect("/dashboard/events");
  }

  await clientPromise.collection("events").insertOne(event);

  return redirect("/dashboard/events");
}
