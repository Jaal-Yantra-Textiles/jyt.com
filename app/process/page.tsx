"use client"
import React, { Fragment, useState } from 'react';
import { useQuery, QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Loading from './loading'; // Adjust the import path as necessary
import Image from 'next/image';

import { parseISO, format } from 'date-fns'
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import DesignDetailsModal from './modal';
import { fetchDesigns } from '../services/api';


const MyQueryClient = new QueryClient();


export default function  ProcessPage() {
  return (
    <div className="mx-auto  w-full max-w-7xl px-4 flex min-h-screen flex-col justify-between p-4 sm:p-8 md:p-24">
    <QueryClientProvider client={MyQueryClient}>
      <ProcessPageImpl />
    </QueryClientProvider>
    </div>
    
  );
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  const formatDate = (dateString: any) => {
    return format(parseISO(dateString), 'MMMM d, yyyy');
  };

  const statuses: any = {
    Published: 'text-green-700 bg-green-50 ring-green-600/20',
    Draft : 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
  }


function ProcessPageImpl() {
  const { data, isError, isLoading, error } = useQuery({ queryKey: ['designs'], queryFn: fetchDesigns });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);


  const openModal = (design: any) => {
    setSelectedDesign(design);
    // fetch using useQuery()
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDesign(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <ul role="list" className="divide-y divide-gray-100">
      {data?.data.map((design: any) => (
        <li key={design.id} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <Image
                src={`https://directus-bucket-jy.s3.us-east-1.amazonaws.com/${design.design_sketches[0]?.directus_files_id.filename_disk}`}
                alt={design.design_name}
                width={100}
                height={100}
                className="h-10 w-10 rounded"
              />
              <p className="text-sm dark: text-white font-semibold leading-6 text-gray-900">{design.design_name}</p>
              <p
                className={classNames(
                  statuses[design.status],
                  'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                )}
              >
                {design.status}
              </p>
            </div>
            {/* Additional design details */}
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 dark:text-white text-gray-500">
              <p className="whitespace-nowrap">
                Started on <time dateTime={formatDate(design.date_created)}>{formatDate(design.date_created)}</time>
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="truncate">Created by {design.designer.name}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <button
              onClick={() => openModal(design)}
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View design<span className="sr-only">, {design.name}</span>
            </button>
            <DesignDetailsModal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    design={selectedDesign} 
            />
            <Menu as="div" className="dark: text-white relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 dark:text-gray-100 text-gray-500 hover:text-gray-900 hover:dark:text-white">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit<span className="sr-only">, {design.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Move<span className="sr-only">, {design.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Delete<span className="sr-only">, {design.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          
        </li>
      ))}
    </ul>
</>
  );
}
