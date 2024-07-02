import FamilyForm from "@/components/FamilyForm";
import { ObjectId } from "mongodb";
import { getFamilyById } from "../actions";

export default async function FamilyPage({
  params,
}: {
  params: { id: string };
}) {
  const family = await getFamilyById(new ObjectId(params.id));

  return <FamilyForm id={params.id} family={JSON.stringify(family)} />;
}
