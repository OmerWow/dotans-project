import DonatorsPage from "../donators/page";
import EventsPage from "../events/page";
import FamiliesPage from "../families/page";
import VolunteersPage from "../volunteers/page";

export default function ReportsPage() {
    const items = [
        EventsPage,
        FamiliesPage,
        VolunteersPage,
        DonatorsPage
    ];

    return (
        <div className="overflow-hidden rounded-md bg-white shadow">
            <ul role="list" className="divide-gray-100 divide-y-8">
                {items.map((Item, index) => (
                    <li key={index.toString()} className="py-4">
                        <Item isReport />
                    </li>
                ))}
            </ul>
        </div>
    );
}