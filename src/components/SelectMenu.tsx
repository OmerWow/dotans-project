"use client";

import React, { useEffect, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import type { Volunteer } from '../../types/volunteer';
import type { Donator } from '../../types/donator';
import type { Family } from '../../types/family';

const getDisplayName = (item: Volunteer | Donator | Family): string => {
    if ('contact' in item) {
        // It's a Family
        return `משפחת ${(item as Family).contact.lastName}`;
    } else {
        // It's a Volunteer or Donator
        return `${item.firstName} ${item.lastName}`;
    }
};

const getAdditionalInfo = (item: Volunteer | Donator | Family, type: SelectMenuProps['type']): string => {
    switch (type) {
        case "Volunteer":
            return (item as Volunteer).preference;
        case "Donator":
            return `${(item as Donator).donations.length} תרומות`;
        case "Family":
            return `${(item as Family).numberOfPeople} נפשות`;
        default:
            return "";
    }
};

export default function SelectMenu({ items, handleSelect, type }: SelectMenuProps) {
    const [query, setQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState<Volunteer | Donator | Family | null>();

    useEffect(() => {
        setSelectedItem(items[0] || null);
    }, [items]);

    const filteredItems = query === ''
        ? items
        : items.filter((item) => {
            const name = getDisplayName(item);
            const additionalInfo = getAdditionalInfo(item, type);
            return [name, additionalInfo].some(field =>
                field.toLowerCase().includes(query.toLowerCase())
            );
        });

    const getLabel = (plural?: boolean) => {
        switch (type) {
            case "Volunteer": return plural ? "מתנדבים" : "מתנדב";
            case "Donator": return plural ? "תורמים" : "תורם";
            case "Family": return plural ? "משפחות" : "משפחה";
        }
    };

    return (
        <Combobox
            as="div"
            value={selectedItem}
            onChange={(item) => {
                setQuery('');
                setSelectedItem(item);
                handleSelect(item as Volunteer & Donator & Family);
            }}
        >
            <Label className="block text-sm leading-6 text-gray-600">
                בחר {getLabel()} להוספה לאירוע
            </Label>
            <div className="relative mt-2">
                <ComboboxInput
                    className="w-96 rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery('')}
                    displayValue={(item: Volunteer | Donator | Family | null) =>
                        item ? getDisplayName(item) : `לא נשארו ${getLabel(true)}`
                    }
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>

                {filteredItems.length > 0 && (
                    <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-96 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredItems.map((item) => (
                            <ComboboxOption
                                key={'_id' in item ? item._id.toString() : getDisplayName(item)}
                                value={item}
                                className="group relative cursor-default select-none py-2 px-3 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                            >
                                <div className="flex">
                                    <span className="truncate group-data-[selected]:font-semibold">
                                        {getDisplayName(item)}
                                    </span>
                                    <span className="mr-2 truncate text-gray-500 group-data-[focus]:text-indigo-200">
                                        {getAdditionalInfo(item, type)}
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
    items: Volunteer[] | Donator[] | Family[];
    handleSelect: (item: Volunteer & Donator & Family) => void;
    type: "Volunteer" | "Donator" | "Family";
};