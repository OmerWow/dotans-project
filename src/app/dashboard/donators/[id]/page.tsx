import { ObjectId } from "mongodb";
import { getDonationsByDonatorId, getDonatorById } from "../actions";
import DonatorForm from "@/components/donator/DonatorForm";

export default async function DonatorPage({
  params,
}: {
  params: { id: string; };
}) {
  const donatorId = new ObjectId(params.id);

  const [donator, donations] = await Promise.all([
    getDonatorById(donatorId),
    getDonationsByDonatorId(donatorId),
  ]);

  return <DonatorForm id={params.id} donator={JSON.stringify(donator)} donations={JSON.stringify(donations)} />;
}
