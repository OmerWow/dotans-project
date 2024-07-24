import Link from 'next/link';
import type { ElementType } from 'react';

export default function PageLink({ name, href, description, Icon }: PageLinkProps) {
    return (
        <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <div className="relative w-full max-w-sm overflow-hidden text-left bg-white rounded-lg shadow-2xl transform lg:max-w-lg" >
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start sm:justify-between">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-right">
                            <h3 className="text-lg font-semibold text-gray-900 leading-6">
                                {name}
                            </h3>
                            <div className="mt-2">
                                <p className="text-gray-500">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-gray-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                            <Icon className="w-8 h-8 text-gray-600" aria-hidden="true" />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                    <Link
                        href={href}
                        className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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