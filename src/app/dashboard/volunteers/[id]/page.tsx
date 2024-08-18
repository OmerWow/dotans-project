import { ObjectId } from "mongodb";
import { getVolunteerById } from "../actions";
import VolunteerForm from "@/components/volunteers/VolunteerForm";

export default async function VolunteerPage({
  params,
}: {
  params: { id: string; };
}) {
  const volunteer = await getVolunteerById(new ObjectId(params.id));

  return <VolunteerForm id={params.id} volunteer={JSON.stringify(volunteer)} />;
}
