import Link from 'next/link';
import React from 'react';
import globalStore from '../store/global';
import { useRouter } from 'next/router';

const tabitems = [
  {
    name: 'home'.toUpperCase(),
    svg: '/svg/home.svg',
    link: '/',
  },
  {
    name: 'my items'.toUpperCase(),
    svg: '/svg/my-items.svg',
    link: '/nft/myitems',
  },
  {
    name: 'create'.toUpperCase(),
    svg: '/svg/create.svg',
    link: '/nft/create',
  },
  // {
  //  name: "roles".toUpperCase(),
  //  svg: "/svg/roles.svg",
  //  link: "/admin",
  // },
  {
    name: 'profile'.toUpperCase(),
    svg: '/svg/profile.svg',
    link: '/user/profile',
  },
];

export default function Footertab() {
  const [profile, set] = globalStore((state) => [state.profile, state.set]);
  const router = useRouter();

  const handleClose = () => {
    set({
      common: {
        toggleProfileDrawer: false,
      },
    });
  };

  return (
    <div className="sm:hidden z-50 sticky bottom-0 h-16 bg-gradient-to-r from-[#1E2B9D] via-[#653CC9] to-[#081869] w-full">
      <div className="flex gap-4 justify-between pt-4 px-4">
        {tabitems.map((item: any, index: number) => {
          return (
            <Link
              key={index}
              href={
                item.name != 'PROFILE' || profile.user
                  ? item.link
                  : `/user/signin?redirect=${encodeURIComponent(router.asPath)}`
              }
            >
              <div
                className=" flex flex-col items-center justify-center"
                onClick={handleClose}
              >
                <img
                  alt={item.svg}
                  className="h-[18.75px] w-[18px] "
                  src={item.svg}
                />
                <p className="text-[#79C3FF] py-1 text-xs">
                  {item.name != 'PROFILE' || profile.user
                    ? item.name
                    : 'sign in'.toUpperCase()}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
