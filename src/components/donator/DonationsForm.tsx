"use client";

import { useState } from "react";
import type { Donation, DonationType } from "../../../types/donation";
import DonationsTable from "./DonationsTable";
import { ObjectId } from "mongodb";

export default function DonationsForm({ donationsString, donatorId }: DonationsFormProps) {
    const [currentDonations, setCurrentDonations] = useState<Donation[]>(donationsString ? JSON.parse(donationsString) : []);

    const donationTypes: DonationType[] = [
        "כספים",
        "פריטי יד שנייה",
        "מוצרי מזון",
        "שירות",
    ];

    return (
        <div className="pb-12 border-b border-gray-900/10">
            <h2 className="text-base font-semibold text-gray-900 leading-7">
                ניהול תרומות
            </h2>
            <p className="mt-1 text-sm text-gray-600 leading-6 mb-10">
                פה תוכל להוסיף תרומות לתורם זה
            </p>

            <DonationsTable donationsString={JSON.stringify(currentDonations)} />

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border p-4 max-w-screen-sm border-gray-300 rounded-xl">
                <div className="sm:col-span-4">
                    <h2 className="text-base font-semibold text-gray-900">
                        הוספת תרומה
                    </h2>
                </div>

                <div className="sm:col-span-4">
                    <h3 className="block text-sm font-medium text-gray-900 leading-6">
                        סוג תרומה
                    </h3>
                    <div className="mt-2 space-y-2">
                        {donationTypes.map((donation, index) => {
                            return (
                                <div key={donation} className="flex items-center gap-x-3">
                                    <input
                                        required
                                        id={donation}
                                        value={donation}
                                        name="donationType"
                                        type="radio"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                        defaultChecked={index === 0}
                                    />
                                    <label
                                        htmlFor={donation}
                                        className="block text-sm font-medium text-gray-900 leading-6"
                                    >
                                        {donation}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                        סכום / שווי התרומה
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm w-96">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                            <span className="text-gray-500 sm:text-xs">ש״ח</span>
                        </div>
                        <input
                            id="donationValue"
                            name="donationValue"
                            type="number"
                            step={100}
                            placeholder="0.00"
                            aria-describedby="donationValue"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <span id="donationValue" className="text-gray-500 sm:text-xs">
                                ₪
                            </span>
                        </div>
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label
                        htmlFor="notes"
                        className="block text-sm font-medium text-gray-900 leading-6"
                    >
                        הערות נוספות
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            className="block w-80 sm:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="הערות נוספות"
                        />
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <button
                        type="button"
                        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => {
                            const donationType = (document.querySelector('input[name="donationType"]:checked') as HTMLInputElement).value as DonationType;
                            const donationValue = Number((document.getElementById("donationValue") as HTMLInputElement).value);
                            const notes = (document.getElementById("notes") as HTMLTextAreaElement).value;

                            const newDonation: Donation = {
                                _id: new ObjectId(),
                                donatorId,
                                type: donationType,
                                value: donationValue,
                                notes,
                            };

                            setCurrentDonations([...currentDonations, newDonation]);
                        }}
                    >
                        הוסף תרומה
                    </button>
                </div>
            </div>
        </div>
    );
};

type DonationsFormProps = {
    donationsString: string;
    donatorId: ObjectId;
};