import Link from 'next/link';
import { useRouter } from 'next/router';

import Drawer from './drawer/SideDrawer';
import globalStore from '../store/global';
import { useReducerPlus } from '../utils/hooks';
import ProfileDrawer from './drawer/ProfileDrawer';
import {
  SECONDARY_BUTTON,
  SECONDARY_BUTTON_DARK,
  SECONDARY_BUTTON_WRAPPER,
} from '../styles/theme';
import ExploreDrawer from '../routes/nft/explore/ExploreDrawer';
import Sandwich from './icons/Sandwich';

const Navbar = () => {
  const router = useRouter();
  const [profile, common, set] = globalStore((state) => [
    state.profile,
    state.common,
    state.set,
    state.reset,
  ]);
  const [state, update] = useReducerPlus({
    sideBar: false,
    profileBar: common.toggleProfileDrawer,
    explore: false,
    toggleDark: false,
  });

  const handleClick = (path: string) => {
    if (!profile.user) {
      router.replace(`${path}?redirect=${encodeURIComponent(router.asPath)}`);
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
  return (
    <>
      <div
        className={`w-full top-0 z-50 sticky font-semibold ${
          common.isDark
            ? 'bg-gradient-to-r from-[#080527] to-[#00479A]'
            : 'bg-white'
        } text-primary h-20 grid grid-cols-3 md:grid-cols-5  lg:grid-cols-12  shadow-lg`}
      >
        <div className="flex cols-span-1 md:col-span-2 md:gap-4 lg:col-span-6   items-center lg:gap-5">
          <div className=" my-auto ml-2 md:ml-4 ">
            <Link href="/">
              <div className="relative cursor-pointer z-10">
                <img
                  alt="logo"
                  className="h-14 w-16 lg:h-16 lg:w-20"
                  src={common.isDark ? '/svg/logo_dark.svg' : '/svg/logo.svg'}
                />
              </div>
            </Link>
          </div>
          <div>
            <Link href="/nft/explore">
              <div className={`${SECONDARY_BUTTON_WRAPPER} hidden sm:block`}>
                <button
                  className={`
                    ${
                      common.isDark ? SECONDARY_BUTTON_DARK : SECONDARY_BUTTON
                    }}`}
                >
                  {/* <span className={`${common.isDark && "text-white"}`}> */}
                  Explore
                  {/* </span> */}
                </button>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/nft/create">
              <div className={`${SECONDARY_BUTTON_WRAPPER} hidden sm:block`}>
                <button
                  className={`
                    ${
                      common.isDark ? SECONDARY_BUTTON_DARK : SECONDARY_BUTTON
                    }}`}
                >
                  Create
                </button>
              </div>
            </Link>
          </div>
        </div>
        {common.isDark && (
          <>
            <img
              src="/images/blue.png"
              alt="blue"
              className="absolute top-0 right-96 z-0"
            />
            <img
              src="/images/pink.png"
              alt="blue"
              className="absolute top-0 right-40 z-0"
            />
          </>
        )}

        <div className=" flex px-2  items-center col-span-2   md:col-span-3  gap-3 md:gap-4 md:px-5 justify-end lg:col-span-6 lg:gap-6">
          <div className="  hidden sm:block w-24 h-9 bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-[2px] rounded-full">
            <div
              className={`p-5 h-full relative cursor-pointer w-full rounded-full px-3 py-2 ${
                common.isDark ? 'bg-[#00479A]' : 'bg-white'
              } `}
              onClick={handleToggleDarkMode}
            >
              <button className="cursor-pointer absolute w-6 h-6 ml-2 mb-1 bottom-0 left-0">
                {common.isDark ? (
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
                {common.isDark ? (
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

          {/* <label className="relative items-center cursor-pointer hidden sm:block w-24 h-10   bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-[3px] rounded-full">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-full h-full bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label> */}

          {router.pathname === '/nft/explore' && (
            <div
              className="block lg:hidden  "
              onClick={() => {
                update({ explore: true });
              }}
            >
              <img
                alt="search"
                className="w-10"
                src={
                  common.isDark
                    ? '/svg/search-white.svg'
                    : '/svg/search-blue.svg'
                }
              />
            </div>
          )}
          <ExploreDrawer
            open={state.explore}
            onClose={(flag: boolean) => update({ explore: flag })}
          />
          <div
            className={`cursor-pointer   block sm:hidden ${
              common.isDark && 'text-white'
            }`}
            onClick={() => update({ sideBar: true })}
          >
            <Sandwich />
            {/* <img
              alt="burger"
              src="/svg/burger-blue.svg"
              className="w-10 h-10"
            /> */}
          </div>
          <div
            className={`cursor-pointer hidden sm:block z-10 ${
              common.isDark && 'text-white'
            }`}
            onClick={() => {
              update({ sideBar: true });
            }}
          >
            <Sandwich />
          </div>
          <Drawer
            open={state.sideBar}
            onClose={(flag: boolean) => update({ sideBar: flag })}
          />
          {profile.user ? (
            router.pathname != '/user/signin' ? (
              <div>
                <div
                  id="nav-profile"
                  className="cursor-pointer rounded-full my-auto "
                  onClick={() => {
                    // update({ profileBar: true });
                    set({
                      common: {
                        toggleProfileDrawer: true,
                      },
                    });
                  }}
                >
                  <img
                    alt="profile"
                    src={profile?.user?.profilePicUrl || '/images/ceek-min.png'}
                    id="user-profile-picture-header"
                    className="z-10 rounded-full w-12 h-12 object-cover my-auto"
                  />
                </div>
                <ProfileDrawer
                  open={common.toggleProfileDrawer}
                  onClose={(flag: boolean) => {
                    set({
                      common: {
                        toggleProfileDrawer: false,
                      },
                    });
                    update({ profileBar: flag });
                  }}
                />
              </div>
            ) : (
              <></>
            )
          ) : (
            <>
              <div
                className={`${SECONDARY_BUTTON_WRAPPER} hidden sm:block z-10`}
                onClick={() => handleClick('/user/signin')}
              >
                <button className={`${SECONDARY_BUTTON}`}>Sign In</button>
              </div>
              <div
                className={`${SECONDARY_BUTTON_WRAPPER} gradientButton hidden sm:block`} //ask
              >
                <Link href="/user/signup">
                  <button
                    className={` text-white cursor-pointer w-full h-full rounded-full px-3 py-[10px] dark:bg-[#14215d]`}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
