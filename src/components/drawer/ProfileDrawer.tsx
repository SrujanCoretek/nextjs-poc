import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { handleScroll } from '../../utils/hooks';
import globalStore from '../../store/global';
import {
  AdminIcon,
  ProfileIcon,
  MyitemsIcon,
  // Copy1,
  Logout,
  Refresh,
  // Wallet1,
} from '../icons';
import { toast } from 'react-toastify';
import logger from '../../utils/log';
import * as api from '../../utils/api';
import { shallow } from 'zustand/shallow';
import ArrowLeft from '../icons/ArrowLeft';
import { textgradient } from '../../styles/theme';
import { shortenAddress } from '../../utils/helper';
import ButtonLoader from '../Loaders/buttonLoader';
import { useReducerPlus } from '../../utils/hooks';

export default function ProfileDrawer(props: {
  open: boolean;
  onClose: (flag: boolean) => void;
}) {
  const { open, onClose } = props;

  const [state, update] = useReducerPlus<{
    loader: boolean;
  }>({
    loader: false,
  });

  const [profile, common, set, reset] = globalStore(
    (state) => [state.profile, state.common, state.set, state.reset],
    shallow
  );

  const divRef = useRef(null);

  useEffect(() => {
    handleScroll(open);
    // eslint-disable-next-line
  }, [open]);

  const handleClickOutside = () => {
    if (divRef) {
      onClose(false);
    }
  };

  const handleLogout = () => {
    // localStorage.clear();
    reset();
    if (window) {
      window.localStorage.clear();
      if (window.location.pathname != '/') window.location.replace('/');
      else window.location.reload();
    }
  };

  async function updateBalanceNCeekUsdPrice() {
    update({
      loader: true,
    });
    try {
      // common.toggleLoader(true);
      const [
        [walletBalances, err1],
        [ceekUsdPrice, err2],
        [binanceUsdPrice, err3],
      ] = await Promise.all([
        api.getMyWalletBalances({
          walletAddress: profile.user?.walletAddress || '',
        }),
        api.getCeekUsdPrice(),
        api.getBinanceUsdPrice(),
      ]);

      if (walletBalances) {
        set({
          profile: {
            walletBalances,
          },
        });
      }

      if (ceekUsdPrice) {
        set({
          common: {
            ceekUsdPrice,
          },
        });
      }

      if (binanceUsdPrice) {
        set({
          common: {
            binanceUsdPrice,
          },
        });
      }

      if (!err1 && !err2 && !err3) {
        toast.success(' Balance Updated');
      }

      // common.toggleLoader(false);
    } catch (err: any) {
      toast.error('could not update balance');
      logger.log('updateBalance', err.message);
    }
    update({
      loader: false,
    });
  }

  return (
    <div>
      <div
        ref={divRef}
        onClick={handleClickOutside}
        className={`fixed top-0 left-0 inset-0 z-50 h-screen w-screen bg-black opacity-50  transform ease-in-out 
        ${
          open
            ? ' transition-opacity opacity-100 duration-500 translate-x-0'
            : ' delay-10 opacity-0 translate-x-full transition-full'
        }`}
      ></div>
      <div
        className={`fixed top-0 right-0 z-[9999] flex h-[calc(100vh-64px)] sm:h-screen w-full md:w-[500px]  bg-white shadow-lg delay-400 duration-500 ease-in-out transition-all transform  overflow-auto ${
          open ? 'translate-x-0 ' : 'translate-x-full'
        }
      `}
      >
        <div className="flex flex-col relative sm:justify-between h-full p-4">
          <div
            onClick={() => onClose(false)}
            className="cursor-pointer absolute text-accentblue"
            id="back-svg"
          >
            <ArrowLeft />
          </div>
          <div className="mt-4 sm:mt-2 mb-1 flex flex-col gap-3 w-full">
            <div className="bg-gradient-to-r from-[#6a18b5] via-[#8e00c2] to-[#ca2f8b] rounded-full h-24 w-24  grow-0 shrink-0 sm:h-36 sm:w-36 p-1.5 mx-auto relative">
              <img
                alt="profileimg"
                src={profile.user?.profilePicUrl || '/images/ceek-min.png'}
                className="rounded-full h-full w-full mx-auto"
              />
              {profile.user?.isKycPassed && (
                <div className="absolute -top-8 left-12 sm:-top-7  sm:left-20 text-xl">
                  <img
                    alt="crown1"
                    className="w-10 h-10"
                    src="/svg/crown1.svg"
                  />
                </div>
              )}
              {profile.user?.isVerified && (
                <div className="absolute  bottom-1 right-0 sm:bottom-1 sm:right-2  rounded-full">
                  <img
                    alt="crown1"
                    className=" w-6 h-6  sm:w-8 sm:h-8 rounded-full"
                    src="/svg/verified.svg"
                  />
                </div>
              )}
            </div>
            <div className="text-center mt-2 ">
              <p className="text-xl sm:text-2xl font-semibold capitalize">
                {profile.user?.fullName}
              </p>
              <p className="text-secondary text-lg"> {profile.user?.email}</p>
            </div>
            <div className="px-2 grid grid-cols-11 items-start justify-between">
              <img
                className="col-span-1 w-7 h-7"
                src="/svg/gradient-wallet.svg"
              />

              <div className="col-span-2 flex flex-col">
                <span
                  className={` text-base md:text-xl ${textgradient} font-semibold  `}
                >
                  CEEK
                </span>
                <span className="text-[#FFB629] text-sm font-medium  leading-3">
                  Active
                </span>
              </div>
              <div
                className={`justify-end col-span-7 flex text-base md:text-lg  font-semibold  `}
              >
                <span className={`${textgradient}`}>
                  {shortenAddress(profile.user?.walletAddress ?? '')}
                </span>
              </div>

              <div
                className="col-span-1 cursor-pointer"
                onClick={() => {
                  if (profile.user?.walletAddress) {
                    navigator.clipboard.writeText(profile.user?.walletAddress);
                    toast.success('Copied to Clipboard');
                  }
                }}
              >
                <img className=" ml-2" src="/svg/gradient-copy.svg" />
              </div>
            </div>
            <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] divide-y divide-accent-3 px-2 p-2 grid mt-2 gap-2 rounded-lg">
              {/* Available */}
              <div className="">
                <div className="grid grid-cols-9 gap-2 p-2">
                  <div className="col-span-8 my-auto  text-xl">Available</div>
                  <div
                    id="refresh"
                    className="m-auto col-span-1    cursor-pointer h-8 w-8  flex justify-center items-center"
                    onClick={updateBalanceNCeekUsdPrice}
                  >
                    {state.loader ? <ButtonLoader /> : <Refresh />}
                  </div>
                </div>
                <div className="grid grid-cols-9 gap-2 p-2 ">
                  <img
                    alt="ceekcoin"
                    src="/images/ceek-coin-logo.png"
                    className="mt-1 h-7 w-7 sm:w-10 sm:h-10 "
                  />
                  <div className="col-span-6 my-auto">
                    <div
                      className={`text-base md:text-xl ${textgradient} sm:text-2xl`}
                    >
                      {`${profile.walletBalances?.ceek.toFixed(2) ?? 0}`} CEEK
                    </div>
                    <div className="text-accent-3 text-sm md:text-lg text-[#9288E0] ">
                      $
                      {`${(
                        (profile.walletBalances?.ceek ?? 0) *
                        (common?.ceekUsdPrice ?? 0)
                      ).toFixed(2)}`}
                    </div>
                  </div>

                  <div
                    className=" col-span-1 m-auto cursor-pointer"
                    // onClick={}
                  >
                    <img src="/svg/receive.svg" />
                  </div>
                  <div
                    className=" col-span-1 m-auto cursor-pointer"
                    // onClick={}
                  >
                    <img src="/svg/send.svg" />
                  </div>
                </div>
              </div>
              {/* hold */}
              <div className="hidden">
                <div className="grid grid-cols-9 gap-2 p-2">
                  <div className=" text-right  my-auto text-xl">Hold</div>
                  <div className="m-auto items-center cursor-pointer">
                    <img
                      alt="hold"
                      className=" w-4 sm:w-6"
                      src="/svg/hold.svg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-9 gap-2 p-2 ">
                  <img
                    alt="ceekcoin"
                    src="/images/ceek-coin-logo.png"
                    className="mt-1 h-7 w-7 sm:w-10 sm:h-10  "
                  />
                  <div className="col-span-6 my-auto font-semibold text-xl sm:text-2xl">
                    <div
                      id="ceek-balance"
                      className={`text-base md:text-xl text-[#45BFE4] sm:text-2xl`}
                    >
                      {`${(profile.walletBalances?.ceek ?? 0).toFixed(2)}`} CEEK
                    </div>
                    <div className="text-accent-3 text-sm md:text-lg text-[#9288E0] ">
                      $
                      {`${(
                        (profile.walletBalances?.ceek ?? 0) *
                        (common?.ceekUsdPrice ?? 0)
                      ).toFixed(2)}`}
                    </div>
                  </div>

                  {/* <div
                    className=" col-span-1 m-auto cursor-pointer"
                  onClick={updateBalanceNCeekUsdPrice}
                >
                  <Refresh />
                  </div> */}
                  <div
                    className=" col-span-1 m-auto cursor-pointer"
                    // onClick={}
                  >
                    <img src="/svg/receive.svg" />
                  </div>
                  <div
                    className=" col-span-1 m-auto cursor-pointer"
                    // onClick={}
                  >
                    <img src="/svg/send.svg" />
                  </div>
                </div>
              </div>
            </div>

            <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] divide-y divide-accent-3 p-4 grid mt-2 rounded-lg h-full">
              <div className="grid grid-cols-9 gap-2">
                <img
                  alt="bnbcoin"
                  src="/images/bnb-coin-logo.png"
                  className="mt-1 h-7 w-7 sm:w-10 sm:h-10 "
                />

                <div className="col-span-6 my-auto font-semibold text-xl sm:text-2xl">
                  <div
                    className={`text-base md:text-xl textMultiColorGradient`}
                  >
                    {`${parseFloat(profile.walletBalances?.bnb ?? '0').toFixed(
                      2
                    )} `}{' '}
                    BNB
                  </div>
                  <div className="text-accent-3 text-sm md:text-lg text-[#9288E0] ">
                    $
                    {`${(
                      (profile.walletBalances?.bnb
                        ? parseFloat(profile.walletBalances?.bnb)
                        : 0) * (common?.binanceUsdPrice ?? 0)
                    ).toFixed(2)}`}
                  </div>
                </div>
                <div
                  className=" col-span-1 m-auto cursor-pointer"
                  // onClick={}
                >
                  <img src="/svg/receive.svg" />
                </div>
                <div
                  className=" col-span-1 m-auto cursor-pointer"
                  // onClick={}
                >
                  <img src="/svg/send.svg" />
                </div>
              </div>
            </div>
            <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] divide-y divide-accent-3 p-4 grid mt-2 rounded-lg h-full">
              {(profile.user?.role == 'admin' ||
                profile.user?.role == 'super_admin') && (
                <Link href="/admin">
                  <div
                    className="hover:bg-accentblue rounded-lg flex gap-2 p-2 text-accent-8 hover:text-white cursor-pointer"
                    onClick={() => onClose(false)}
                  >
                    <div className="my-auto">
                      <AdminIcon />
                    </div>
                    <p className="text-xl sm:text-2xl font-semibold uppercase">
                      {profile.user?.role == 'super_admin'
                        ? 'Super Admin'
                        : 'Admin'}
                    </p>
                  </div>
                </Link>
              )}

              <Link href="/user/profile">
                <div
                  className="hover:bg-accentblue  items-center rounded-lg flex gap-2 p-2 text-accent-8 hover:text-white cursor-pointer"
                  onClick={() => onClose(false)}
                >
                  <div className="my-auto pl-1">
                    <ProfileIcon />
                  </div>
                  <p className="text-xl   sm:text-2xl font-semibold uppercase">
                    Profile
                  </p>
                </div>
              </Link>

              <Link href="/nft/myitems">
                <div
                  className="hover:bg-accentblue rounded-lg flex gap-2 p-2 text-accent-8 hover:text-white cursor-pointer"
                  onClick={() => onClose(false)}
                >
                  <div className="my-auto pl-1">
                    <MyitemsIcon />
                  </div>
                  <p className="text-xl sm:text-2xl font-semibold uppercase">
                    My Items
                  </p>
                </div>
              </Link>
              {/* <div onClick={handleLogout}>
                <div
                  className="hover:bg-accentblue rounded-lg flex gap-2 p-2 text-accent-8 hover:text-white cursor-pointer"
                  onClick={() => onClose(false)}
                >
                  <div className="my-auto pl-1">
                    <MyitemsIcon />
                  </div>
                  <p className="text-xl sm:text-2xl font-semibold uppercase">
                    Logout
                  </p>
                </div>
              </div> */}

              {/* <div className="hover:bg-accentblue rounded-lg flex gap-2 p-2 text-accent-8 hover:text-white cursor-pointer">
                <div className="my-auto">
                  <TransactionIcon />
                </div>
                <p className="text-xl sm:text-2xl font-semibold uppercase">
                  My Transaction
                </p>
              </div>
              <div className="hover:bg-accentblue rounded-lg flex gap-2 p-2 text-accent-8 hover:text-white cursor-pointer">
                <div className="my-auto">
                  <AccountIcon />
                </div>
                <p className="text-xl sm:text-2xl font-semibold uppercase">
                  Account
                </p>
              </div> */}
            </div>
          </div>

          <div
            className="mx-auto my-3 text-white  rounded-full w-full bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F]  sm:  text-xl sm:text-2xl font-bold text-center cursor-pointer"
            onClick={handleLogout}
          >
            <div className="flex justify-center gap-4 my-auto p-4">
              <p>Logout</p>
              <div className="my-auto">
                <Logout />
              </div>
            </div>
          </div>
          <div className="h-[20px] text-white md:hidden lg:block">
            dummy div for space
          </div>
        </div>
      </div>
    </div>
  );
}
