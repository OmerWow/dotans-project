import DonatorForm from "@/components/DonatorForm";
import { ObjectId } from "mongodb";
import { getDonatorById } from "../actions";

export default async function DonatorPage({
  params,
}: {
  params: { id: string };
}) {
  const donator = await getDonatorById(new ObjectId(params.id));

  return <DonatorForm id={params.id} donator={JSON.stringify(donator)} />;
}
