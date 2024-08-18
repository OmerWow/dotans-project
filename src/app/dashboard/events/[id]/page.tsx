import EventForm from "@/components/events/EventForm";
import { ObjectId } from "mongodb";
import { getAllDonators } from "../../donators/actions";
import { getAllFamilies } from "../../families/actions";
import { getAllVolunteers } from "../../volunteers/actions";
import { getEventById } from "../actions";

export default async function EventPage({
  params,
}: {
  params: { id: string; };
}) {
  const [event, allVolunteers, allFamilies, allDonators] = await Promise.all([
    getEventById(new ObjectId(params.id)),
    getAllVolunteers(),
    getAllFamilies(),
    getAllDonators(),
  ]);

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
