import React, { useEffect, useRef } from 'react';
import {
  CeekLand,
  CeekVR,
  CeekHeadset,
  CeekHeadset1,
  Ball,
  Cart,
  Android,
  Ios,
  Blog,
} from '../icons';

import Link from 'next/link';
import { DrawerMenu } from '../../types/ui';
import { handleScroll } from '../../utils/hooks';
import globalStore from '../../store/global';
import ArrowLeft from '../icons/ArrowLeft';
import { LINEAR_BACKGROUND } from '../../styles/theme';

export default function Drawer(props: {
  open: boolean;
  onClose: (flag: boolean) => void;
}) {
  const { open, onClose } = props;
  const divRef = useRef(null);

  const [isDark] = globalStore((state) => [state.common.isDark]);

  useEffect(() => {
    handleScroll(open);
    document.addEventListener('click', handleClickOutside, open);
    return () => {
      document.removeEventListener('click', handleClickOutside, open);
    };
    // eslint-disable-next-line
  }, [open]);

  const handleClickOutside = () => {
    if (divRef) {
      onClose(false);
    }
  };
  const handleToggleDarkMode = () => {
    // set({
    //   common: {
    //     isDark: state.toggleDark,
    //   },
    // });
    // update({ toggleDark: !state.toggleDark });
  };

  const menu: DrawerMenu[] = [
    {
      name: 'Ceek Land',
      icon: <CeekLand />,
      externalLink: 'https://land.ceek.com/',
    },
    {
      name: 'Ceek Tokens',
      icon: <CeekVR />,
      externalLink: 'https://www.ceek.io/exchanges/',
    },
    {
      name: 'Ceek vr headset',
      icon: <CeekHeadset />,
      externalLink: 'https://www.ceekvr.com/vr-headset',
    },
    {
      name: 'Ceek vr headphones',
      icon: <CeekHeadset1 />,
      externalLink: 'https://www.ceekvr.com/4dheadphones',
    },
    {
      name: 'Sports',
      icon: <Ball />,
      externalLink: 'https://www.ceek.com/discover/category/Sports/Popular/',
    },
    {
      name: 'Ceek Shop',
      icon: <Cart />,
      externalLink: 'https://ceekvr.com/',
    },
    {
      name: 'Download ceek app',
      icon: <Android />,
      externalLink:
        'https://play.google.com/store/apps/details?id=com.ceek.virtualrealityconcerts',
    },
    {
      name: 'Download ceek app',
      icon: <Ios />,
      externalLink:
        'https://apps.apple.com/us/app/ceek-virtual-reality/id1169054349',
    },
    {
      name: 'Blog',
      icon: <Blog />,
      externalLink: 'https://www.ceek.com/blog/',
    },
  ];

  return (
    <div>
      <div
        ref={divRef}
        className={`fixed top-0 left-0 inset-0 z-30 h-screen w-screen bg-black opacity-50  transform ease-in-out 
        ${
          open
            ? ' transition-opacity opacity-100 duration-500 translate-x-0'
            : ' delay-10 opacity-0 translate-x-full transition-full'
        }`}
      />
      <div
        className={`fixed top-0 right-0 z-[9999] flex h-full w-full md:w-[500px] shadow-lg delay-400 duration-500 ease-in-out transition-all transform  ${
          open ? 'translate-x-0 ' : 'translate-x-full'
        }
        ${isDark ? 'bg-[#0B0063]' : 'bg-white'}
      `}
      >
        <div className="relative  flex w-full h-full flex-col px-8 py-14 overflow-auto">
          <div
            onClick={() => onClose(false)}
            className={`cursor-pointer ${
              isDark ? 'text-white' : 'text-[#0D00FF]'
            }`}
          >
            <ArrowLeft />
          </div>

          <div
            className={` block sm:hidden mx-auto ${LINEAR_BACKGROUND} rounded-full p-[2px] h-10 w-24`}
          >
            {/* <div className="h-full w-full bg-white p-5"></div> */}
            <div
              className={` h-full relative cursor-pointer w-full  rounded-full px-8 py-4 ${
                isDark ? 'bg-[#00479A]' : 'bg-white'
              } `}
              onClick={handleToggleDarkMode}
            >
              <button className="cursor-pointer absolute w-6 h-6 ml-2 mb-1 bottom-0 left-0">
                {isDark ? (
                  <img
                    alt="light"
                    className="h-full w-full"
                    src="/svg/disableLight.svg"
                  />
                ) : (
                  <img
                    alt="light"
                    className="h-full w-full"
                    src="/svg/enableLight.svg"
                  />
                )}
              </button>
              <button className="cursor-pointer w-6 h-6 mr-2 mb-1 absolute bottom-0 right-0 ">
                {isDark ? (
                  <img
                    alt="light"
                    className="h-full w-full"
                    src="/images/enableDark.png"
                  />
                ) : (
                  <img
                    alt="dark"
                    className="h-full w-full"
                    src="/images/disableDark.png"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="my-10 flex flex-col gap-3 w-full">
            {menu.map((item: DrawerMenu, index: number) => (
              <Link href={item.externalLink} key={index} legacyBehavior>
                <a target="_blank">
                  <div
                    className={`rounded-xl border-2 grid grid-cols-8 gap-12 sm:gap-4 p-2 px-4 font-bold text-xs sm:text-lg  hover:text-white cursor-pointer ${
                      isDark
                        ? 'border-white text-white hover:bg-white hover:text-[#0B0063]'
                        : 'border-[#0D00FF] text-[#0D00FF] hover:bg-[#0D00FF]'
                    }`}
                    onClick={() => onClose(false)}
                  >
                    <div className="text-center m-auto w-8">{item.icon}</div>
                    <div className="col-span-7 my-auto">
                      {item.name.toUpperCase()}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
