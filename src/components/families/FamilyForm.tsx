"use client";

import { addOrUpdateFamily } from "@/app/dashboard/families/actions";
import Link from "next/link";
import { useActionState } from "react";
import { Family, FamilyPreference } from "../../../types/family";
import { Gender } from "../../../types/gender";

export default function FamilyForm({ id, family }: FamilyFormProps) {
  const [error, action, isPending] = useActionState(addOrUpdateFamily, "");

  const currentFamily: Family = JSON.parse(family);

  const genders: Gender[] = ["זכר", "נקבה", "אחר"];
  const preferences: FamilyPreference[] = ["משלוח", "כרטיס"];

  return (
    <form action={action}>
      <div className="space-y-12">
        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold text-gray-900 leading-7">
            ניהול משפחות
          </h2>
          <p className="mt-1 text-sm text-gray-600 leading-6">
            פה תוכל להוסיף משפחה חדשה ולערוך משפחות קיימות
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
                htmlFor="numberOfPeople"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                מספר נפשות
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="number"
                    name="numberOfPeople"
                    id="numberOfPeople"
                    className="block w-80 sm:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="5"
                    min={1}
                    defaultValue={currentFamily?.numberOfPeople}
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
                    defaultValue={currentFamily?.phone}
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
                    defaultValue={currentFamily?.email}
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
                    defaultValue={currentFamily?.address}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium text-gray-900 leading-6">
                העדפת המשפחה
              </h3>
              <div className="mt-2 space-y-2">
                {preferences.map((preference) => {
                  return (
                    <div key={preference} className="flex items-center gap-x-3">
                      <input
                        required
                        id={preference}
                        value={preference}
                        name="preference"
                        type="radio"
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                        defaultChecked={
                          preference === currentFamily?.preference
                        }
                      />
                      <label
                        htmlFor={preference}
                        className="block text-sm font-medium text-gray-900 leading-6"
                      >
                        {preference}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium text-gray-900 leading-6">
                האם המשפחה מוכרת לרווחה?
              </h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-x-3">
                  <input
                    id="familiarWithWelfare"
                    value="yes"
                    name="familiarWithWelfare"
                    type="radio"
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                    defaultChecked={currentFamily?.familiarWithWelfare}
                  />
                  <label
                    htmlFor="familiarWithWelfare"
                    className="block text-sm font-medium text-gray-900 leading-6"
                  >
                    כן
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="familiarWithWelfare"
                    value="no"
                    name="familiarWithWelfare"
                    type="radio"
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                    defaultChecked={!currentFamily?.familiarWithWelfare}
                  />
                  <label
                    htmlFor="familiarWithWelfare"
                    className="block text-sm font-medium text-gray-900 leading-6"
                  >
                    לא
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold text-gray-900 leading-7">
            איש קשר
          </h2>
          <p className="mt-1 text-sm text-gray-600 leading-6">
            פרטי איש הקשר של המשפחה
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="contactIdNumber"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                תעודת זהות
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    name="contactIdNumber"
                    id="contactIdNumber"
                    className="block w-80 sm:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0123456789"
                    defaultValue={currentFamily?.contact.idNumber}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="contactFirstName"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                שם פרטי
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    id="contactFirstName"
                    name="contactFirstName"
                    defaultValue={currentFamily?.contact.firstName}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="contactLastName"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                שם משפחה
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    id="contactLastName"
                    name="contactLastName"
                    defaultValue={currentFamily?.contact.lastName}
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
                        name="contactGender"
                        type="radio"
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                        defaultChecked={
                          gender === currentFamily?.contact.gender
                        }
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
                htmlFor="contactBirthDate"
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                יום הולדת
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="datetime-local"
                    id="contactBirthDate"
                    name="contactBirthDate"
                    defaultValue={
                      currentFamily?.contact.birthDate
                        ? new Date(currentFamily.contact.birthDate)
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
          href="/dashboard/families"
          className="text-sm font-semibold text-gray-900 leading-6"
        >
          ביטול
        </Link>
      </div>
    </form>
  );
}

type FamilyFormProps = {
  id: string;
  family: string;
};
