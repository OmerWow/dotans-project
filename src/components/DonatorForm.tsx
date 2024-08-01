"use client";

import { addOrUpdateDonator } from "@/app/dashboard/donators/actions";
import Link from "next/link";
import { useActionState } from "react";
import { Donation, Donator } from "../../types/donator";
import { Gender } from "../../types/gender";

export default function DonatorForm({ id, donator }: DonatorFormProps) {
  const [error, action, isPending] = useActionState(addOrUpdateDonator, "");

  const currentDonator: Donator = JSON.parse(donator);

  const genders: Gender[] = ["זכר", "נקבה", "אחר"];
  const donationTypes: Donation[] = [
    "כספים",
    "פריטי יד שנייה",
    "מוצרי מזון",
    "שירות",
  ];

  return (
    <form action={action}>
      <div className="space-y-12">
        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold text-gray-900 leading-7">
            ניהול תורמים
          </h2>
          <p className="mt-1 text-sm text-gray-600 leading-6">
            פה תוכל להוסיף תורם חדש ולערוך תורמים קיימים
          </p>

          <input
            type="text"
            name="_id"
            id="_id"
            className="hidden"
            value={id}
            readOnly
          />

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="idNumber"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                תעודת זהות
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    name="idNumber"
                    id="idNumber"
                    className="block w-80 sm:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0123456789"
                    defaultValue={currentDonator?.idNumber}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                שם פרטי
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    id="firstName"
                    name="firstName"
                    defaultValue={currentDonator?.firstName}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                שם משפחה
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    id="lastName"
                    name="lastName"
                    defaultValue={currentDonator?.lastName}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium text-gray-900 leading-6">
                מין
              </h3>
              <div className="mt-2 space-y-2">
                {genders.map((gender) => {
                  return (
                    <div key={gender} className="flex items-center gap-x-3">
                      <input
                        required
                        id={gender}
                        value={gender}
                        name="gender"
                        type="radio"
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                        defaultChecked={gender === currentDonator?.gender}
                      />
                      <label
                        htmlFor={gender}
                        className="block text-sm font-medium text-gray-900 leading-6"
                      >
                        {gender}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                יום הולדת
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="datetime-local"
                    id="birthDate"
                    name="birthDate"
                    defaultValue={
                      currentDonator?.birthDate
                        ? new Date(currentDonator.birthDate)
                          .toISOString()
                          .slice(0, 16)
                        : new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
                          .toISOString()
                          .slice(0, 16)
                    }
                    max={new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
                      .toISOString()
                      .slice(0, 16)}
                    step={86400}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                כתובת
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={currentDonator?.address}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                טלפון
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="tel"
                    id="phone"
                    name="phone"
                    defaultValue={currentDonator?.phone}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                אימייל
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={currentDonator?.email}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
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
                  defaultValue={currentDonator?.notes}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium text-gray-900 leading-6">
                סוג תרומה
              </h3>
              <div className="mt-2 space-y-2">
                {donationTypes.map((donation) => {
                  return (
                    <div key={donation} className="flex items-center gap-x-3">
                      <input
                        required
                        id={donation}
                        value={donation}
                        name="donationType"
                        type="radio"
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                        defaultChecked={
                          donation === currentDonator?.donationType
                        }
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
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start mt-6 gap-x-6">
        <button
          type="submit"
          disabled={isPending}
          className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-50"
        >
          {isPending ? "שומר..." : "שמור"}
        </button>
        <Link
          href="/dashboard/donators"
          className="text-sm font-semibold text-gray-900 leading-6"
        >
          ביטול
        </Link>
      </div>
    </form>
  );
}

type DonatorFormProps = {
  id: string;
  donator: string;
};
