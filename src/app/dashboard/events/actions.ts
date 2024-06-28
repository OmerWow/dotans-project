"use server";

import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";
import type { Event, EventKind, EventStatus } from "../../../../types/events";

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

export async function addOrUpdateEvent(formData: FormData) {
  const _id = new ObjectId(formData.get("_id") as string);

  const event: Event = {
    _id,
    name: formData.get("name") as string,
    date: new Date(formData.get("dateAndTime") as string),
    kind: formData.get("eventKind") as EventKind,
    status: formData.get("eventStatus") as EventStatus,
    notes: formData.get("notes") as string,
  };

  if (await getEventById(_id)) {
    return (await clientPromise
      .collection("events")
      .updateOne({ _id }, { $set: event })) as unknown as Event;
  }

  return (await clientPromise
    .collection("events")
    .insertOne(event)) as unknown as Event;
}
