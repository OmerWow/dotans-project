import { getAllVolunteers } from "./actions";
import VolunteersTable from "@/components/volunteers/VolunteersTable";

export default async function VolunteersPage() {
  const volunteers = await getAllVolunteers();

  return <VolunteersTable volunteersString={JSON.stringify(volunteers)} />;
}