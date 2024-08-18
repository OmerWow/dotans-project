"use client";

export default function DownloadAllAsCSVButton({ csv }: DownloadAllAsCSVButtonProps) {
    return (
        <button
            type="button"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
                const blob = new Blob([csv], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `כל המידע.csv`;
                a.click();
                window.URL.revokeObjectURL(url);
            }}>
            הורד את כל המידע כקובץ CSV
        </button>
    );
}

type DownloadAllAsCSVButtonProps = {
    csv: string;
};