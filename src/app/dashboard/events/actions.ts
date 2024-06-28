"use server";

import clientPromise from "../../../../lib/mongodb";
import type { Event } from "../../../../types/events";

export async function getAllEvents() {
  return (await clientPromise
    .collection("events")
    .find()
    .toArray()) as unknown as Event[];
}

export async function getEventById(id: string) {
  return (await clientPromise
    .collection("events")
    .findOne({ id })) as unknown as Event;
}

export async function addEvent(formData: FormData) {
  console.log("formData", formData);

  const event = {};

  return (await clientPromise
    .collection("events")
    .insertOne(event)) as unknown as Event;
}
