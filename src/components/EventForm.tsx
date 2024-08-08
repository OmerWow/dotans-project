"use client";

import { addOrUpdateEvent } from "@/app/dashboard/events/actions";
import Link from "next/link";
import { useActionState, useState, type Dispatch, type SetStateAction } from "react";
import { Donator } from "../../types/donator";
import type { Event } from "../../types/event";
import { EventKind, EventStatus } from "../../types/event";
import { Family } from "../../types/family";
import { Volunteer } from "../../types/volunteer";
import SelectMenu from "./SelectMenu";
import { XMarkIcon } from "@heroicons/react/20/solid";
import type { ObjectId } from "mongodb";

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

  const [selectedVolunteers, setSelectedVolunteers] = useState<Volunteer[]>(
    volunteers.filter((volunteer) => currentEvent?.volunteers.includes(volunteer._id))
  );
  const [selectedDonators, setSelectedDonators] = useState<Donator[]>(
    donators.filter((donator) => currentEvent?.donators.includes(donator._id))
  );
  const [selectedFamilies, setSelectedFamilies] = useState<Family[]>(
    families.filter((family) => currentEvent?.families.includes(family._id))
  );

  const statuses: EventStatus[] = ["מתבצע", "הוקפא", "הסתיים"];
  const kinds: EventKind[] = ["חלוקה", "איסוף"];

  const handleSelect = <T extends { _id: ObjectId; }>(
    item: T,
    currentSelected: T[],
    setSelected: Dispatch<SetStateAction<T[]>>,
    allItems: T[]
  ) => {
    const selectedItem = allItems.find(curr => curr._id === item._id);
    if (selectedItem && !currentSelected.some(item => item._id === selectedItem._id)) {
      setSelected(prev => [...prev, selectedItem]);
    }
  };

  const handleVolunteerSelect = (item: Volunteer) =>
    handleSelect(item, selectedVolunteers, setSelectedVolunteers, volunteers);

  const handleDonatorSelect = (item: Donator) =>
    handleSelect(item, selectedDonators, setSelectedDonators, donators);

  const handleFamilySelect = (item: Family) =>
    handleSelect(item, selectedFamilies, setSelectedFamilies, families);

  return (
    <form action={action}>
      <div className="space-y-12">
        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold text-gray-900 leading-7">
            ניהול אירוע
          </h2>
          <p className="mt-1 text-sm text-gray-600 leading-6">
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
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                שם האירוע
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm w-80 sm:w-96 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
                className="block text-sm font-medium text-gray-900 leading-6"
              >
                תאריך ושעה
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm w-80 sm:w-96 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
                    className="flex border-none rounded-md shadow-sm w-80 sm:w-96 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium text-gray-900 leading-6">
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
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                        defaultChecked={kind === currentEvent?.kind}
                      />
                      <label
                        htmlFor={kind}
                        className="block text-sm font-medium text-gray-900 leading-6"
                      >
                        {kind}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-4">
              <h3 className="block text-sm font-medium text-gray-900 leading-6">
                סטטוס אירוע
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
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                        defaultChecked={status === currentEvent?.status}
                      />
                      <label
                        htmlFor={status}
                        className="block text-sm font-medium text-gray-900 leading-6"
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
                className="block text-sm font-medium text-gray-900 leading-6"
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

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold text-gray-900 leading-7">
            הוספת אנשים
          </h2>
          <p className="mt-1 text-sm text-gray-600 leading-6">
            פה תוכל להוסיף אנשים לאירוע
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-900 leading-6">
                  מתנדבים
                </legend>
                <SelectMenu
                  items={volunteers.filter((volunteer) => !selectedVolunteers.some((vol) => vol._id === volunteer._id))}
                  handleSelect={handleVolunteerSelect}
                  type="Volunteer"
                />
                <ol className='list-inside list-decimal mt-2'>
                  {selectedVolunteers
                    .map((volunteer) => (
                      <li key={volunteer._id.toString()}>
                        {volunteer.firstName} {volunteer.lastName}
                        <span className="mr-1.5 truncate text-sm text-gray-500 group-data-[focus]:text-indigo-200">
                          {volunteer.preference}
                        </span>
                        <XMarkIcon
                          className="cursor-pointer inline w-5 h-5 mr-2 text-red-500"
                          onClick={() => setSelectedVolunteers(selectedVolunteers.filter((vol) => vol._id !== volunteer._id))}
                        />
                      </li>
                    ))}
                </ol>
                {selectedVolunteers.length > 0 && (
                  selectedVolunteers.map((volunteer) => (
                    <input
                      key={volunteer._id.toString()}
                      type="hidden"
                      name="volunteers"
                      value={volunteer._id.toString()}
                      readOnly
                    />
                  ))
                )}
              </fieldset>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-900 leading-6">
                  תורמים
                </legend>
                <SelectMenu
                  items={donators.filter((donator) => !selectedDonators.some((don) => don._id === donator._id))}
                  handleSelect={handleDonatorSelect}
                  type="Donator"
                />
                <ol className='list-inside list-decimal mt-2'>
                  {selectedDonators
                    .map((donator) => (
                      <li key={donator._id.toString()}>
                        {donator.firstName} {donator.lastName}
                        <span className="mr-1.5 truncate text-sm text-gray-500 group-data-[focus]:text-indigo-200">
                          {donator.donations?.length || 0} תרומות
                        </span>
                        <XMarkIcon
                          className="cursor-pointer inline w-5 h-5 mr-2 text-red-500"
                          onClick={() => setSelectedDonators(selectedDonators.filter((don) => don._id !== donator._id))}
                        />
                      </li>
                    ))}
                </ol>
                {selectedDonators.length > 0 && (
                  selectedDonators.map((donator) => (
                    <input
                      key={donator._id.toString()}
                      type="hidden"
                      name="donators"
                      value={donator._id.toString()}
                      readOnly
                    />
                  ))
                )}
              </fieldset>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-900 leading-6">
                  משפחות
                </legend>
                <SelectMenu
                  items={families.filter((family) => !selectedFamilies.some((fam) => fam._id === family._id))}
                  handleSelect={handleFamilySelect}
                  type="Family"
                />
                <ol className='list-inside list-decimal mt-2'>
                  {selectedFamilies
                    .map((family) => (
                      <li key={family._id.toString()}>
                        משפחת {family.contact.lastName}
                        <span className="mr-1.5 truncate text-sm text-gray-500 group-data-[focus]:text-indigo-200">
                          {family.numberOfPeople} נפשות
                        </span>
                        <XMarkIcon
                          className="cursor-pointer inline w-5 h-5 mr-2 text-red-500"
                          onClick={() => setSelectedFamilies(selectedFamilies.filter((fam) => fam._id !== family._id))}
                        />
                      </li>
                    ))}
                </ol>
                {selectedFamilies.length > 0 && (
                  selectedFamilies.map((family) => (
                    <input
                      key={family._id.toString()}
                      type="hidden"
                      name="families"
                      value={family._id.toString()}
                      readOnly
                    />
                  ))
                )}
              </fieldset>
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
          href="/dashboard/events"
          className="text-sm font-semibold text-gray-900 leading-6"
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
