import { ObjectId } from "mongodb";
import { getEventById } from "../actions";
import EventForm from "@/components/EventForm";
import { getAllVolunteers } from "../../volunteers/actions";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(new ObjectId(params.id));
  const allVolunteers = await getAllVolunteers();

  return (
    <EventForm
      id={params.id}
      event={JSON.stringify(event)}
      allVolunteers={JSON.stringify(allVolunteers)}
    />
  );
}
