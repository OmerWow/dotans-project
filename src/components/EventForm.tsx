"use client";

import { addOrUpdateEvent } from "@/app/dashboard/events/actions";
import Link from "next/link";
import { useActionState } from "react";
import { Donator } from "../../types/donator";
import type { Event } from "../../types/events";
import { EventKind, EventStatus } from "../../types/events";
import { Family } from "../../types/families";
import { Volunteer } from "../../types/volunteers";

export default function EventForm({
  id,
  event,
  allVolunteers,
  allFamilies,
  allDonators,
}: EventFormProps) {
  const [error, action, isPending] = useActionState(addOrUpdateEvent, "");

  const currentEvent: Event = JSON.parse(event);
  const volunteers: Volunteer[] = JSON.parse(allVolunteers);
  const families: Family[] = JSON.parse(allFamilies);
  const donators: Donator[] = JSON.parse(allDonators);

  const statuses: EventStatus[] = ["מתבצע", "הוקפא", "הסתיים"];
  const kinds: EventKind[] = ["חלוקה", "איסוף"];

  return (
    <form action={action}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            ניהול אירוע
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            פה תוכל להוסיף אירוע חדש ולערוך אירועים קיימים
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
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                שם האירוע
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="block w-80 sm:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="האירוע שלי"
                    defaultValue={currentEvent?.name}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="dateAndTime"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                תאריך ושעה
              </label>
              <div className="mt-2">
                <div className="flex w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="datetime-local"
                    id="dateAndTime"
                    name="dateAndTime"
                    defaultValue={
                      currentEvent?.date
                        ? new Date(currentEvent.date).toISOString().slice(0, 16)
                        : new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
                          .toISOString()
                          .slice(0, 16)
                    }
                    min={new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
                      .toISOString()
                      .slice(0, 16)}
                    className="flex border-none w-80 sm:w-96 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium leading-6 text-gray-900">
                סוג אירוע
              </h3>
              <div className="mt-2 space-y-2">
                {kinds.map((kind) => {
                  return (
                    <div key={kind} className="flex items-center gap-x-3">
                      <input
                        required
                        id={kind}
                        value={kind}
                        name="eventKind"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        defaultChecked={kind === currentEvent?.kind}
                      />
                      <label
                        htmlFor={kind}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {kind}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium leading-6 text-gray-900">
                סטאטוס אירוע
              </h3>
              <div className="mt-2 space-y-2">
                {statuses.map((status) => {
                  return (
                    <div key={status} className="flex items-center gap-x-3">
                      <input
                        required
                        id={status}
                        value={status}
                        name="eventStatus"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        defaultChecked={status === currentEvent?.status}
                      />
                      <label
                        htmlFor={status}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {status}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="notes"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                הערות לאירוע
              </label>
              <div className="mt-2">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="block w-80 sm:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="הערות לאירוע"
                  defaultValue={currentEvent?.notes}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            הוספת אנשים
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            פה תוכל להוסיף אנשים לאירוע
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <fieldset>
                <legend className="block text-sm font-medium leading-6 text-gray-900">
                  מתנדבים
                </legend>
                <div className="mt-2 space-y-5">
                  {volunteers.map((volunteer) => {
                    return (
                      <div
                        key={volunteer._id.toString()}
                        className="relative flex items-start"
                      >
                        <div className="flex h-6 items-center">
                          <input
                            type="checkbox"
                            id="volunteers"
                            name="volunteers"
                            value={volunteer._id.toString()}
                            defaultChecked={currentEvent?.volunteers?.includes(
                              volunteer._id,
                            )}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="mr-3 text-sm leading-6">
                          <label
                            htmlFor="volunteers"
                            className="font-medium text-gray-900"
                          >
                            {volunteer.firstName} {volunteer.lastName}
                          </label>{" "}
                          <span
                            id="volunteer-preference"
                            className="text-gray-500"
                          >
                            {volunteer.preference}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <fieldset>
                <legend className="block text-sm font-medium leading-6 text-gray-900">
                  משפחות
                </legend>
                <div className="mt-2 space-y-5">
                  {families.map((family) => {
                    return (
                      <div
                        key={family._id.toString()}
                        className="relative flex items-start"
                      >
                        <div className="flex h-6 items-center">
                          <input
                            type="checkbox"
                            id="families"
                            name="families"
                            value={family._id.toString()}
                            defaultChecked={currentEvent?.families?.includes(
                              family._id,
                            )}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="mr-3 text-sm leading-6">
                          <label
                            htmlFor="families"
                            className="font-medium text-gray-900"
                          >
                            משפחת {family.contact.lastName}
                          </label>{" "}
                          <span
                            id="family-number-of-people"
                            className="text-gray-500"
                          >
                            {family.numberOfPeople} נפשות
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <fieldset>
                <legend className="block text-sm font-medium leading-6 text-gray-900">
                  תורמים
                </legend>
                <div className="mt-2 space-y-5">
                  {donators.map((donator) => {
                    return (
                      <div
                        key={donator._id.toString()}
                        className="relative flex items-start"
                      >
                        <div className="flex h-6 items-center">
                          <input
                            type="checkbox"
                            id="donators"
                            name="donators"
                            value={donator._id.toString()}
                            defaultChecked={currentEvent?.donators?.includes(
                              donator._id,
                            )}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="mr-3 text-sm leading-6">
                          <label
                            htmlFor="donators"
                            className="font-medium text-gray-900"
                          >
                            {donator.firstName} {donator.lastName}
                          </label>{" "}
                          <span id="donation-type" className="text-gray-500">
                            {donator.donationType}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-start gap-x-6">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-50"
        >
          {isPending ? "שומר..." : "שמור"}
        </button>
        <Link
          href="/dashboard/events"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          ביטול
        </Link>
      </div>
    </form>
  );
}

type EventFormProps = {
  id: string;
  event: string;
  allVolunteers: string;
  allFamilies: string;
  allDonators: string;
};
