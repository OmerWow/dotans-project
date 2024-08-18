import { getAllFamilies } from "./actions";
import FamiliesTable from "@/components/families/FamiliesTable";

export default async function FamiliesPage() {
  const families = await getAllFamilies();

  return <FamiliesTable familiesString={JSON.stringify(families)} />;
}