import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const inputFields = [
  {
    name: 'speed',
    type: 'SPEED',
    description:
      'enables Ceekers to see long distances,underwater,in the dark and more.Ultra vision is limited to visors and certain types of transport only.',
    commission: 8,
  },
  {
    name: 'strength',
    type: 'STRENGTH',
    description:
      'enables Ceekers to see long distances,underwater,in the dark and more.Ultra vision is limited to visors and certain types of transport only.',
    commission: 4,
  },
  {
    name: 'ultra vision',
    type: 'ULTRA_VISION',
    description:
      'enables Ceekers to see long distances,underwater,in the dark and more.Ultra vision is limited to visors and certain types of transport only.',
    commission: 5,
  },
  {
    name: 'flight',
    type: 'FLIGHT',
    description:
      'enables Ceekers to see long distances,underwater,in the dark and more.Ultra vision is limited to visors and certain types of transport only.',
    commission: 6,
  },
];

interface Props {
  title: any;
}

export default function Index({ title }: Props) {
  const [open, setOpen] = useState(false);

  /*
  const [items, setItems] = useState<Array<any>>([]);
  const addItem = (val: any) => {
    const found = items.some((el) => el.name === val.name);
    if (!found) {
      const temp = [...items, val];
      setItems(temp);
    } else removeItem(val.name);
  };
  */
  /*
  const removeItem = (name: any) => {
    const temp = [...items];
    temp.splice(
      temp.findIndex((e) => e.name === name),
      1
    );
    setItems(temp);
  };
  */

  return (
    <div className="w-full">
      <Menu as="div" className="relative">
        <div>
          <div className="w-full bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-0.5 rounded-lg">
            <Menu.Button
              className="  rounded-lg px-2 bg-white  w-full "
              onClick={() => setOpen(!open)}
            >
              <div className="relative text-left w-full h-full flex justify-between">
                <div className="text-xl py-2 text-[#3B5162] w-full">
                  {title}
                </div>
                <img alt="dark-stroke" src="/svg/dark-stroke.svg" />
              </div>
            </Menu.Button>
          </div>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 shadow-lg focus:outline-none bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-0.5"
            style={{ zIndex: 99 }}
          >
            <div className="w-full h-full bg-white flex flex-col justify-between divide-y">
              {inputFields.map((item, index) => {
                return (
                  <Menu.Item key={index}>
                    <div className="hover:bg-accent-2 p-4 text-xl cursor-pointer">
                      {item.name}
                    </div>
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
