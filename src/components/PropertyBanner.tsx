import React from "react";
type Props = { tittle: string; desktopImage: any; mobileImage: any };

export default function Banner({ tittle, desktopImage, mobileImage }: Props) {
  return (
    <div className="relative w-full h-[400px] md:h-72 bg-gradient-to-l md:bg-gradient-to-r bg-no-repeat bg-cover bg-left bg-fixed overflow-hidden">
      <div className="h-full w-full absolute hidden sm:block">
        <img
          src="/images/banner-1-min.png"
          alt="Hero Banner"
          className="z-10 object-cover w-full h-full absolute"
          style={{ objectPosition: "left center" }}
        />
      </div>
      <div className="h-full z-10 w-full block sm:hidden mt-8 absolute top-0 ">
        <img
          src="/images/banner-1-mobile.png"
          alt="Hero Banner Mobile"
          className=" object-cover object-center w-full h-full"
        />
      </div>
      <div className="h-full bg-blue-900 w-full hidden sm:block md:h-72 md:w-full  lg:h-full xl:w-full absolute right-0   md:-mr-36 lg:-mr-20 xl:-mr-24 2xl:-mr-36">
        <img
          src={desktopImage}
          alt="Hero Banner Artist"
          className="object-contain w-full h-full"
          style={{ objectPosition: "right center" }}
        />
      </div>
      <div className="h-full w-full sm:hidden bg-blue-900  absolute ">
        <img
          src={mobileImage}
          alt="Hero Banner Artist Mobile"
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div
        className="z-20 absolute space-y-4 w-4/5 md:w-3/5 lg:w-5/12 mt-10 sm:mt-0"
        style={{ left: "10%", top: "35%" }}
      >
        <span className="mt-12 sm:mt-0 text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-bold block">
          {tittle}
        </span>
      </div>
    </div>
  );
}
