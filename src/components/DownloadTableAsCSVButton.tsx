"use client";

import type { Donator } from "../../types/donator";
import type { Event } from "../../types/event";
import type { Family } from "../../types/family";
import type { Volunteer } from "../../types/volunteer";

export default function DownloadTableAsCSVButton({ data, name }: DownloadTableAsCSVButtonProps) {
    const convertDataToCSV = (dataArray: Event[] | Family[] | Volunteer[] | Donator[]) => {
        const csv = dataArray.map((row) => {
            return Object.values(row).map((value) => {
                if (typeof value === 'object') {
                    return JSON.stringify(value)
                        .replaceAll(",", " ")
                        .replaceAll("{", "")
                        .replaceAll("}", "")
                        .replaceAll('"', "");
                }

                return value;
            }).join(",");
        });
        csv.unshift(Object.keys(dataArray[0]).join(","));

        return csv.join("\n");
    };

    return (
        <button
            type="button"
            className="rounded-md bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
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

type DownloadTableAsCSVButtonProps = {
    data: string;
    name: string;
};