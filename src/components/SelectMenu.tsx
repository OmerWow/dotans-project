'use client';

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import type { Volunteer } from '../../types/volunteers';
import type { Donator } from '../../types/donator';

export default function SelectMenu({ people, handleSelect, type }: SelectMenuProps) {
    const [query, setQuery] = useState('');
    const [selectedPerson, setSelectedPerson] = useState<Volunteer | Donator | null>();

    useEffect(() => {
        setSelectedPerson(people[0] || null);
    }, [people]);

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                const fieldsToSearch = [
                    person.firstName,
                    person.lastName,
                    type === "Volunteer" ? (person as Volunteer).preference : (person as Donator).donationType];
                return fieldsToSearch.some((field) => field.toLowerCase().includes(query.toLowerCase()));
            });

    return (
        <Combobox
            as="div"
            value={selectedPerson}
            onChange={(person) => {
                setQuery('');
                setSelectedPerson(person);
                handleSelect(person as Volunteer | Donator, type);
            }}
        >
            <Label className="block text-sm  leading-6 text-gray-600">בחר {type === "Volunteer" ? "מתנדב" : "תורם"} על מנת להוסיף אותו לאירוע</Label>
            <div className="relative mt-2">
                <ComboboxInput
                    className="w-96 rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery('')}
                    displayValue={(person: Volunteer | null) => person ? `${person.firstName} ${person.lastName}` : `לא נשארו ${type === "Volunteer" ? "מתנדבים" : "תורמים"}`}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>

                {filteredPeople.length > 0 && (
                    <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-96 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPeople.map((person) => (
                            <ComboboxOption
                                key={person._id.toString()}
                                value={person}
                                className="group relative cursor-default select-none py-2 px-3 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                            >
                                <div className="flex">
                                    <span className="truncate group-data-[selected]:font-semibold">{person.firstName} {person.lastName}</span>
                                    <span className="mr-2 truncate text-gray-500 group-data-[focus]:text-indigo-200">
                                        {
                                            type === "Volunteer"
                                                ? (person as Volunteer).preference
                                                : (person as Donator).donationType
                                        }
                                    </span>
                                </div>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                )}
            </div>
        </Combobox>
    );
}

type SelectMenuProps = {
    people: Volunteer[] | Donator[];
    handleSelect: (person: Volunteer | Donator, type: "Volunteer" | "Donator") => void;
    type: "Volunteer" | "Donator";
};