import { TrashIcon } from "@heroicons/react/24/outline";
import type { DonationsFormType } from "../../../types/donation";
import type { Dispatch, SetStateAction } from "react";

export default function DonationsTable({ donations, setDonations }: DonationsTableProps) {
    return (
        <div className="flow-root w-96">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6">
                                        סוג תרומה
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                        שווי
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                        הערות
                                    </th>
                                    <th scope="col" className="relative py-3.5">
                                        <span className="sr-only">מחק</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {donations.map((donation, index) => (
                                    <tr key={index.toString()}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {donation.type}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{donation.value}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{donation.notes || "אין"}</td>
                                        <td className="relative whitespace-nowrap py-4text-right text-sm font-medium">
                                            <TrashIcon
                                                className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer"
                                                onClick={() => setDonations(donations.filter((_, i) => i !== index))}
                                            />
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
}

type DonationsTableProps = {
    donations: DonationsFormType[];
    setDonations: Dispatch<SetStateAction<DonationsFormType[]>>;
};