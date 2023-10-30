import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { PRIMARY_INPUT_WRAPPER } from '../styles/theme';
import { useReducerPlus } from '../utils/hooks';
import { CATEGORY_NAME_TYPES } from '../utils/constants';

export default function CategoryDropdown(props: {
  onSubmit: (data: any) => Promise<void>;
  addedCollectionType: [];
}) {
  const { onSubmit, addedCollectionType } = props;
  const ref = useRef<HTMLButtonElement>(null);
  const [state, update] = useReducerPlus({
    item: '',
    open: false,
  });

  return (
    <div className="w-full  mt-8 md:mt-9 border-b-2 border-[#00000E]/25">
      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button
          ref={ref}
          className="w-full"
          // onClick={() => update({ open: true })}
        >
          <div className="relative text-left text-xl text-gray-700">
            {state.item ? (
              <span>{state.item}</span>
            ) : (
              <div className="w-full relative">
                <div className={`text-gray-500 ${PRIMARY_INPUT_WRAPPER}`}>
                  Choose Contract Type
                </div>
              </div>
            )}
            <div className="absolute right-0 bottom-0 h-11 w-11 my-auto">
              <img
                src="/svg/stroke1.svg"
                alt="stroke"
                className={` py-4 mx-auto`}
              />
            </div>
          </div>
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
          <Menu.Items className="absolute z-20 left-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {CATEGORY_NAME_TYPES.map(
                (category: { name: string; type: string }, index: number) => (
                  <div key={index}>
                    <Menu.Item
                      disabled={(addedCollectionType as any).includes(
                        category.type
                      )}
                    >
                      {({ active, disabled }) => (
                        <button
                          disabled={disabled}
                          className={`${active && 'bg-violet-500 text-white'} ${
                            disabled && 'text-gray-400 cursor-not-allowed'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={async (e) => {
                            e.preventDefault();
                            onSubmit({ category: category });
                            update({ item: category.name });
                            setTimeout(() => {
                              ref.current?.click();
                            }, 0);
                          }}
                        >
                          {category.name}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                )
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
