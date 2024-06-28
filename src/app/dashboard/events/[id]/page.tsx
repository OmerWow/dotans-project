import { ObjectId } from "mongodb";
import { getEventById } from "../actions";
import EventForm from "@/components/EventForm";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(new ObjectId(params.id));

  return <EventForm id={params.id} event={event} />;
}
