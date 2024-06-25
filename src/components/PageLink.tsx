import Link from 'next/link';
import type { ElementType } from 'react';

export default function PageLink({ name, href, description, Icon }: PageLinkProps) {
    return (
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl w-full max-w-sm lg:max-w-lg" >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start sm:justify-between">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-right">
                            <h3 className="text-lg font-semibold leading-6 text-gray-900">
                                { name }
                            </h3>
                            <div className="mt-2">
                                <p className="text-gray-500">
                                    { description }
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                            <Icon className="h-8 w-8 text-gray-600" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Link
                        href={ href }
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        לחץ פה
                    </Link>
                </div>
            </div>
        </div>
    );
}

type PageLinkProps = {
    name: string;
    href: string;
    description: string;
    Icon: ElementType;
};