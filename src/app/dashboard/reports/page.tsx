import DonatorsTable from "@/components/donators/DonatorsTable";
import { getAllDonators } from "../donators/actions";
import { getAllEvents } from "../events/actions";
import { getAllFamilies } from "../families/actions";
import { getAllVolunteers } from "../volunteers/actions";
import DownloadAllAsCSVButton from "@/components/reports/DownloadAllAsCSVButton";
import EventsTable from "@/components/events/EventsTable";
import FamiliesTable from "@/components/families/FamiliesTable";
import VolunteersTable from "@/components/volunteers/VolunteersTable";

export default async function ReportsPage() {
    const allData = await Promise.all([
        getAllEvents(),
        getAllFamilies(),
        getAllVolunteers(),
        getAllDonators()
    ]);
    const allDataObject = {
        "אירועים": allData[0],
        "משפחות": allData[1],
        "מתנדבים": allData[2],
        "תורמים": allData[3]
    };
    const csv = Object.keys(allDataObject).map(key => {
        const data = allDataObject[key as keyof typeof allDataObject];
        const headers = Object.keys(data[0]);
        const rows = data.map(row => headers.map(header => row[header as keyof typeof row]).join(","));

        return [key, headers.join(","), ...rows].join("\n");
    }).join("\n");

    const tables = [
        () => <EventsTable eventsString={JSON.stringify(allData[0])} isReport />,
        () => <FamiliesTable familiesString={JSON.stringify(allData[1])} isReport />,
        () => <VolunteersTable volunteersString={JSON.stringify(allData[2])} isReport />,
        () => <DonatorsTable donatorsString={JSON.stringify(allData[3])} isReport />
    ];

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900 leading-6">
                        דוחות
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        כאן תוכל לראות את כל המידע שיש במערכת.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:flex-none">
                    <DownloadAllAsCSVButton csv={csv} />
                </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-md bg-white shadow">
                <ul role="list" className="divide-gray-100 divide-y-8">
                    {tables.map((Table, index) => (
                        <li key={index.toString()} className="py-4">
                            <Table />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}