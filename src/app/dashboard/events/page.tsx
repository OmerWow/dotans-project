import { getAllEvents } from "./actions";
import EventsTable from "@/components/events/EventsTable";

export default async function EventsPage() {
  const events = await getAllEvents();

  return <EventsTable eventsString={JSON.stringify(events)} />;
}