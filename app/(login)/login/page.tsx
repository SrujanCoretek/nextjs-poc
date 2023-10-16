/* eslint-disable @next/next/no-img-element */
"use client";
import Head from "next/head";
import Link from "next/link";
// import Input from "../../components/Input";

import { useForm } from "react-hook-form";

// import login from "../components/serverFunctions/Login";

import LoginButton from "../../components/LoginButton";
import { login } from "../../serverFunctions/functions";
import { useState } from "react";
import { redirect } from "next/navigation";

interface Signin {
  email: string;
  password: string;
}

export default function SignIn() {
  const [user, setUser] = useState<any>("");
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Signin>({});

  const handleClick = async () => {
    const payload = { email: watch("email"), password: watch("password") };
    const data = await login(payload);
    if (data) {
      setUser(data);
      setError(null);
    }

    if (data?.error) {
      setError(data.error.message);
      setUser(null);
    }
    console.log({ data });
    // console.log({ error });
  };
  if (user) {
    redirect("/users");
  }

  return (
    <>
      <div className="sm:hidden lg-block">
        <Head>
          <title>Sign In - CEEK NFT Marketplace - CEEK.com</title>
        </Head>
        {/* <Navbar /> */}
      </div>
      <div className="flex sm:h-screen  w-full flex-wrap justify-center items-center">
        <div
          className="hidden h-screen lg:block  lg:w-2/3 "
          style={{
            backgroundImage: `url('/images/sign-in-min.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className=" z-10 h-full  p-12 flex flex-col justify-between">
            <div className="text-white">
              <Link href="/">
                <span className="cursor-pointer">
                  <img alt="white-logo" src="/svg/white-logo.svg" />
                </span>
              </Link>
            </div>
            <div className="text-white  lg:text-5xl xl:text-6xl font-bold leading-tight">
              Discover, Collect and Trade Unique NFTs in the CEEK Metaverse
            </div>
          </div>
        </div>

        <div className="dark:bg-[#14215d] text-center items-center flex w-full flex-col place-content-around md:w-1/2 lg:w-1/3 lg:h-screen">
          <div className="w-full xl:px-10 px-4">
            <div className="mt-4 md:mt-0 text-2xl text-[#3B5162]">Sign In</div>
            <button className="mt-5 mx-auto flex justify-center gap-3 md:gap-6 bg-gradient-to-r from-[#1B1FB7] to-[#5DA6F6] text-white text-md sm:text-lg md:text-xl font-semibold rounded-xl w-full py-3 px-4">
              <img alt="facebook" src="/svg/white-facebook.svg" />
              <div>CONNECT WITH FACEBOOK</div>
            </button>
            <div className={`mt-7 text-xl grid grid-cols-5`}>
              <div
                className="h-1 col-span-2 bg-gradient-to-l from-[#C4C4C4]"
                style={{ margin: "10px 0 10px" }}
              ></div>
              <p className="text-sm md:text-xl">OR</p>
              <div
                className="h-1 col-span-2 bg-gradient-to-r from-[#C4C4C4]"
                style={{ margin: "10px 0 10px" }}
              ></div>
            </div>

            <form onSubmit={handleSubmit(handleClick)}>
              <div className="mt-7 flex flex-col gap-6">
                <div className="relative mb-4">
                  <div
                    className={` rounded-xl overflow-hidden flex gap-4 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                  >
                    <input
                      type="text"
                      className="border-2 rounded-md px-2 py-2"
                      placeholder="email"
                      {...register("email", {
                        required: "Please enter your email.",
                      })}
                    />

                    <span className="text-red-500 text-sm absolute  -bottom-5 left-2">
                      {errors.email?.message}
                    </span>
                  </div>
                </div>
                <div className="relative mb-4">
                  <div
                    className={`rounded-xl overflow-hidden flex gap-5 p-4 inputShadow shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                  >
                    <input
                      type="password"
                      className="  rounded-md px-2 py-2"
                      placeholder="password"
                      {...register("password", {
                        required: "Please enter your password.",
                      })}
                    />
                    <span className="text-red-500 text-sm absolute  -bottom-5 left-2">
                      {errors.password?.message}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-1 ">
                      <div className="bg-white w-full h-full grid place-content-center">
                        <input id="strength" type="checkbox" />
                      </div>
                    </div>
                    <label
                      htmlFor="strength"
                      className="text-black font-600 cursor-pointer"
                    >
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="flex flex-wrap ">
                  <div className="w-full text-center sm:px-3">
                    <LoginButton />
                  </div>
                </div>
                <Link href="/user/forgotPassword">
                  <button className="textMultiColorGradient text-sm md:text-xl">
                    Forgot Password?
                  </button>
                </Link>
              </div>
            </form>
          </div>
          <div className="text-sm md:text-xl">
            Not a member? Please{" "}
            <Link href="/user/signup">
              <button className="textMultiColorGradient">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="block sm:hidden">
        <Footer />
      </div> */}
    </>
  );
}
