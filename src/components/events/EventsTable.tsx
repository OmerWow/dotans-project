import { ObjectId } from "mongodb";
import Link from "next/link";
import DownloadTableAsCSVButton from "../reports/DownloadTableAsCSVButton";
import type { Event } from "../../../types/event";

export default function EventsTable({ eventsString, isReport }: EventsTableProps) {
    const events = JSON.parse(eventsString) as Event[];

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900 leading-6">
                        אירועים
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        כאן תוכל לראות את כל האירועים שנקבעו במערכת.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:flex-none">
                    {isReport
                        ? <DownloadTableAsCSVButton data={JSON.stringify(events)} name="אירועים" />
                        : (
                            <Link
                                href={`events/${new ObjectId()}`}
                                className="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                הוסף אירוע
                            </Link>
                        )}
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        שם האירוע
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                    >
                                        תאריך ושעה
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                    >
                                        הערות
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                    >
                                        סוג האירוע
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                    >
                                        סטאטוס
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                    >
                                        מתנדבים
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                    >
                                        משפחות
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                    >
                                        תורמים
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">ערוך</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {events.map((event) => (
                                    <tr key={event._id.toString()}>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                                            {event.name}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(event.date).toLocaleString("he-IL", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                            })}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {event.notes || "אין הערות"}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {event.kind}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {event.status}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {event.volunteers?.length || 0}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {event.families?.length || 0}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {event.donators?.length || 0}
                                        </td>
                                        <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                                            <Link
                                                href={`events/${event._id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                ערוך
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

type EventsTableProps = {
    eventsString: string;
    isReport?: boolean;
};