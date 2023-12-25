import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Timeline from './timeline/page';

// First it should fetch the data probably using the page behind and store activity like this 

// Inspirations -- will contain used tags images for the selected ones



function DesignDetailsModal({ isOpen, onClose, design }: any) {
  
  if (!isOpen || !design) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y" onClose={() => {}}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

         

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block max-w-4xl max-h-full w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {design.design_name}
              </Dialog.Title>
              
              
              <div className="mt-2 text-gray-500">
              {/* <Timeline activity={activity}>
                
                {(item) => (
                  // for example purposes, returning simple JSX// show the inspirations part
                  <> 
                    <span>{item.type}</span>
                    <span>{item.date}</span>
                  </>
                )}
              </Timeline> */}
              </div>
              <button onClick={onClose} className="absolute dark:text-gray-500 top-0 right-0 mt-4 mr-4">
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DesignDetailsModal;
