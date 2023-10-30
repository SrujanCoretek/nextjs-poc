import Link from 'next/link';
import { toast } from 'react-toastify';

import globalStore from '../store/global';
import { useReducerPlus } from '../utils/hooks';
import * as api from '../utils/api';
import ButtonLoader from './Loaders/buttonLoader';
import {
  Instagram,
  Facebook,
  Telegram,
  Twitter,
  Youtube,
  Discord,
} from './icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegEx } from '../utils/regEx';

const ceekMenu = [
  {
    name: 'Explore',
    link: '/nft/explore',
  },
  {
    name: 'How it works',
    link: '/',
  },
  {
    name: 'Support',
    link: '/',
  },
  {
    name: 'Become a partner',
    link: '/',
  },
];

const communityMenu = [
  {
    name: 'CEEK Token',
    link: 'https://www.ceek.io/',
  },
  {
    name: 'Voting',
    link: 'https://voting.ceek.com/#!/login',
  },
  {
    name: 'Terms',
    link: 'https://www.ceek.com/terms/',
  },
  {
    name: 'Privacy',
    link: 'https://www.ceek.com/privacy/',
  },
];

const socialMediaMenu = [
  {
    component: <Facebook />,
    link: 'https://facebook.com/ceekapp',
  },
  {
    component: <Twitter />,
    link: 'https://twitter.com/ceekvr',
  },
  {
    component: <Instagram />,
    link: 'https://www.instagram.com/ceekvr',
  },
  {
    component: <Youtube />,
    link: 'https://www.youtube.com/CEEKVR',
  },
  {
    component: <Telegram />,
    link: 'https://t.me/ceekmetaverse',
  },
  {
    component: <Discord />,
    link: '/',
  },
];

type ISubscribeForm = {
  email: string;
};

const Footer = () => {
  const isDark = globalStore((state) => state.common.isDark);

  const [state, update] = useReducerPlus({
    loader: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubscribeForm>();

  const onSubmit: SubmitHandler<ISubscribeForm> = async (data) => {
    update({ loader: true });
    try {
      const [res, err] = await api.addSubscriber({ email: data.email });
      if (!res || err) {
        toast.error(err);
        return;
      }
      toast.success(res.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      update({ loader: false });
    }
  };

  return (
    <div className="z-50">
      <div
        className={`${
          isDark ? 'bg-[#1D1D1D]' : 'bg-[#EFEFEF]'
        } grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 p-2 md:p-16 gap-12`}
      >
        <Link href="/" className="hidden lg:block">
          <div className="grid justify-items-center md:col-span-1 text-[#0D00FF] dark:text-white sm:block text-center">
            <img
              alt="logo"
              src={isDark ? '/svg/logo_dark.svg' : '/svg/logo.svg'}
            />
          </div>
        </Link>

        <div className="mt-4 lg:m-0 col-span-2 md:col-span-3 lg:col-span-5 flex flex-col gap-4 pr-0 lg:pr-24">
          <div
            className={`${
              isDark ? 'text-white' : 'text-[#3B5162]'
            } text-xl font-semibold`}
          >
            Get the latest CEEK updates
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <input
                type="email"
                className="w-full rounded-3xl border-0 bg-white px-5 py-4 focus:outline-none pr-36"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: RegEx.email,
                    message: 'Invalid email address',
                  },
                })}
              />
              <div className="absolute -right-1 top-0">
                <button
                  className={`bg-[#0D00FF] h-14 px-[35px] drop-shadow-lg rounded-3xl text-white
                  }`}
                  type="submit"
                  disabled={state.loader}
                >
                  {state.loader ? <ButtonLoader /> : <span>I&apos;m In</span>}
                </button>
              </div>
              {errors.email && (
                <span className="text-red-600 p-2">{errors.email.message}</span>
              )}
            </div>
          </form>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <div className="font-bold text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#5C4EFF] to-[#3076FF]">
            CEEK
          </div>
          <ul
            className={`${
              isDark ? 'text-[#ffffff] opacity-70' : 'text-[#3B5162]'
            } text-base flex flex-col gap-2 my-2`}
          >
            {ceekMenu.map(
              (
                { name, link }: { name: string; link: string },
                index: number
              ) => (
                <Link href={link} key={index}>
                  <li>
                    <span className="my-2 cursor-pointer">{name}</span>
                  </li>
                </Link>
              )
            )}
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <div className="font-bold text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#5C4EFF] to-[#3076FF]">
            COMMUNITY
          </div>
          <ul
            className={`${
              isDark ? 'text-[#ffffff] opacity-70' : 'text-[#3B5162]'
            } text-base flex flex-col gap-2 my-2`}
          >
            {communityMenu.map(
              (
                { name, link }: { name: string; link: string },
                index: number
              ) => (
                <li key={index}>
                  <Link href={link} target="_blank">
                    <span className="my-2 cursor-pointer">{name}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div
        className={`${
          isDark ? 'bg-black' : 'bg-white'
        } p-2 md:p-6 lg:px-20 py-5 flex flex-col gap-4 md:flex-row lg:flex-row justify-center lg:justify-between dark:text-[#ffffff] dark:opacity-50`}
      >
        <div
          className={`${
            isDark ? 'text-[#FFFFFF]' : 'text-[#3B5162]'
          } mx-auto lg:mx-0 text-xs md:text-lg font-light`}
        >
          © 2023 CGI Global Panama Inc. All rights reserved.
        </div>
        <div
          className={`${
            isDark ? 'text-[#FFFFFF]' : 'text-[#3B5162]'
          } grid grid-cols-6 gap-8 my-auto mx-auto lg:mx-0 order-first md:order-last lg:order-last dark:opacity-90`}
        >
          {socialMediaMenu.map(
            (
              { component, link }: { component: JSX.Element; link: string },
              index: number
            ) => (
              <Link href={link} target="_blank" key={index}>
                <div className="my-auto hover:text-[#0D0FFF]">{component}</div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
