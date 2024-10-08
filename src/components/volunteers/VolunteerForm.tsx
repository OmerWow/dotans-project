"use client";

import { addOrUpdateVolunteer } from "@/app/dashboard/volunteers/actions";
import Link from "next/link";
import { useActionState } from "react";
import type { Gender } from "../../../types/gender";
import type { Volunteer, VolunteerPreference } from "../../../types/volunteer";

export default function VolunteerForm({ id, volunteer }: VolunteerFormProps) {
  const [error, action, isPending] = useActionState(addOrUpdateVolunteer, "");

  const currentVolunteer: Volunteer = JSON.parse(volunteer);

  const genders: Gender[] = ["זכר", "נקבה", "אחר"];
  const preferences: VolunteerPreference[] = ["נהג", "אריזה", "חלוקה"];

  return (
    <form action={action}>
      <div className="space-y-12">
        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold text-gray-900 leading-7">
            ניהול מתנדבים
          </h2>
          <p className="mt-1 text-sm text-gray-600 leading-6">
            פה תוכל להוסיף מתנדב חדש ולערוך מתנדבים קיימים
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
                    defaultValue={currentVolunteer?.idNumber}
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
                    defaultValue={currentVolunteer?.firstName}
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
                    defaultValue={currentVolunteer?.lastName}
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
                        defaultChecked={gender === currentVolunteer?.gender}
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
                    defaultValue={currentVolunteer?.phone}
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
                    defaultValue={currentVolunteer?.email}
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
                    defaultValue={currentVolunteer?.address}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium text-gray-900 leading-6">
                העדפת המתנדב
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
                          preference === currentVolunteer?.preference
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
          href="/dashboard/volunteers"
          className="text-sm font-semibold text-gray-900 leading-6"
        >
          ביטול
        </Link>
      </div>
    </form>
  );
}

type VolunteerFormProps = {
  id: string;
  volunteer: string;
};
