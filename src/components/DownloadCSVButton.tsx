"use client";

import type { Donator } from "../../types/donator";
import type { Event } from "../../types/event";
import type { Family } from "../../types/family";
import type { Volunteer } from "../../types/volunteer";

export default function DownloadCSVButton({ data, name }: DownloadCSVButtonProps) {
    const convertDataToCSV = (dataArray: Event[] | Family[] | Volunteer[] | Donator[]) => {
        const csv = dataArray.map((row) => Object.values(row).join(","));
        csv.unshift(Object.keys(dataArray[0]).join(","));

        return csv.join("\n");
    };

    return (
        <button
            type="button"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
                const csv = convertDataToCSV(JSON.parse(data));
                const blob = new Blob([csv], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${name}.csv`;
                a.click();
                window.URL.revokeObjectURL(url);
            }}>
            הורד {name} כקובץ CSV
        </button>
    );
}

type DownloadCSVButtonProps = {
    data: string;
    name: string;
};