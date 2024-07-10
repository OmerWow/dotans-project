import EventForm from "@/components/EventForm";
import { ObjectId } from "mongodb";
import { getAllFamilies } from "../../families/actions";
import { getAllVolunteers } from "../../volunteers/actions";
import { getEventById } from "../actions";
import { getAllDonators } from "../../donators/actions";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEventById(new ObjectId(params.id));
  const allVolunteers = await getAllVolunteers();
  const allFamilies = await getAllFamilies();
  const allDonators = await getAllDonators();

  return (
    <EventForm
      id={params.id}
      event={JSON.stringify(event)}
      allVolunteers={JSON.stringify(allVolunteers)}
      allFamilies={JSON.stringify(allFamilies)}
      allDonators={JSON.stringify(allDonators)}
    />
  );
}
