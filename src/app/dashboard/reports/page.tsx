import DonatorsPage from "../donators/page";
import EventsPage from "../events/page";
import FamiliesPage from "../families/page";
import VolunteersPage from "../volunteers/page";
import { getAllDonators } from "../donators/actions";
import { getAllEvents } from "../events/actions";
import { getAllFamilies } from "../families/actions";
import { getAllVolunteers } from "../volunteers/actions";
import DownloadAllAsCSVButton from "@/components/DownloadAllAsCSVButton";

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

    const items = [
        EventsPage,
        FamiliesPage,
        VolunteersPage,
        DonatorsPage
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
                    {items.map((Item, index) => (
                        <li key={index.toString()} className="py-4">
                            <Item isReport />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}