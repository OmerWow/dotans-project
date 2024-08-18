import DonatorsTable from "@/components/donators/DonatorsTable";
import { getAllDonators } from "./actions";

export default async function DonatorsPage() {
  const donators = await getAllDonators();

  return (
    <DonatorsTable donatorsString={JSON.stringify(donators)} />
  );
}