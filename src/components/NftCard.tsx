/* eslint-disable @next/next/no-img-element */
"use client";
import React, { FC } from "react";
import { Like, Liked, Clock } from "./icons";
import {
  EXPLORE_NFT_CARD,
  NFT_CARD,
  NFT_CARD_BACKGROUND,
  NFT_CARD_DARK_BG,
  NFT_CARD_LIGHT_BG,
  NFT_USER_IMAGE,
} from "../app/(styles)/styles/themes";

import { useRouter } from "next/navigation";
import { displayPrice, processIpfsUrl } from "../utils/helper";

// import { useReducerPlus } from '../utils/hooks';
// import Share from "./PopOver/Share";
// import globalStore from "../store/global";
// import { NODE_ENV } from "../conf/env";
const NODE_ENV = "development";

const BASE_UI_URL =
  NODE_ENV === "development"
    ? "https://dev.nft.ceek.com"
    : "https://nft.ceek.com";

const NftCard: FC<any> = (
  {
    item,
    openItem,
    onItemClick,
    onUserNameClick,
    onLikeClick,
    ceekUsdPrice,
    explore,
    isLiked,
  } = {
    onItemClick: () => {
      // Intentionally empty
    },
    onUserNameClick: () => {
      // Intentionally empty
    },
    onLikeClick: () => {
      // Intentionally empty
    },
  }
) => {
  //   const isDark = globalStore((state) => state.common.isDark);
  const router = useRouter();
  const isDark = false;

  const handleUserNameClicked = (item: any) => {
    router.push(`/user/collections?walletAddress=${item.walletAddress}`);
  };

  // const [state, update] = useReducerPlus({
  //   liked: item.isLiked,
  // });

  return (
    <>
      <div
        className="px-2 mb-3 md:px-4 relative "
        onClick={(e) => {
          e && e.stopPropagation && e.stopPropagation();
          onItemClick && onItemClick(item);
        }}
      >
        <div className="group relative">
          <div className="absolute -top-4 right-0">
            {item.listingType === "auction" &&
              item?.startDate < new Date().toISOString && (
                <Clock text={"Ends in"} deadline={item?.endDate} />
              )}
          </div>
          <div className={NFT_CARD_BACKGROUND}></div>
          <div
            className={`${explore ? EXPLORE_NFT_CARD : NFT_CARD}
           ${isDark ? NFT_CARD_DARK_BG : NFT_CARD_LIGHT_BG}`}
          >
            <div className={`h-64 lg:h-72 rounded-t-3xl`}>
              {item?.mimeType?.includes("image") ? (
                <img
                  className="w-full h-full object-cover"
                  width="100"
                  height="100"
                  src={processIpfsUrl(item?.imageUrl) || "/assets/nft.png"}
                  alt="NFT"
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={"/images/no-image-placeholder.png"}
                  alt={"state.data?.name"}
                  width="100%"
                  height="100%"
                />
              )}
            </div>
            <div className="text-center relative mb-2 ">
              <div className={NFT_USER_IMAGE}>
                <img
                  className="w-full h-full object-cover rounded-full"
                  alt="CompanyIcon"
                  src={item?.profilePicUrl || "/images/ceek-min.png"}
                  width="100"
                  height="100"
                  onClick={handleUserNameClicked}
                />
              </div>
            </div>
            <div className="text-center relative px-4 flex flex-col gap-1 lg:gap-2">
              <p
                className={`text-2xl lg:text-4xl font-semibold cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap h-8 lg:h-10 ${
                  isDark && "text-white"
                }`}
              >
                {item.name ? item.name : "CEEK NFT"}
              </p>
              <div className=" h-8 sm:text-lg lg:text-xl text-gray-700 hover:text-gray-900 font-semibold  flex justify-center">
                <span
                  className={` ${isDark ? "text-white" : "text-[#889898]"}`}
                >
                  by
                </span>{" "}
                <div
                  className={` ml-1 max-w-[228px] text-ellipsis overflow-hidden  ${
                    isDark ? "text-[#0361EE]" : "text-[#0b00f5]"
                  } hover:underline capitalize`}
                  onClick={(e: any) => {
                    e && e.stopPropagation && e.stopPropagation();
                    onUserNameClick && onUserNameClick(item);
                  }}
                >
                  {item?.fullName || "Ceek User"}
                </div>
              </div>
              {!explore && (
                <p
                  className={`${
                    isDark ? "text-white" : "text-gray-700"
                  } text-base lg:text-xl h-24 md:h-[114px] overflow-hidden text-ellipsis whitespace-normal`}
                >
                  {item?.description}
                </p>
              )}
            </div>
            {openItem && (
              <div
                className={`${
                  explore ? "my-14 lg:my-8" : "mt-4"
                } grid grid-cols-3 py-1.5 px-4 text-lg lg:text-xl font-semibold cursor-default`}
              >
                <div className="textMultiColorGradient text-left">
                  {displayPrice(item?.price?.toString())} CEEK
                </div>
                <div
                  className={`text-center ${
                    isDark ? "text-[#9288E0]" : "text-[#889898]"
                  }`}
                >
                  <span>{displayPrice(item?.price * ceekUsdPrice)} USD</span>
                </div>
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={(e) => {
                      e && e.stopPropagation && e.stopPropagation();
                      item = { ...item, isLiked: isLiked };
                      onLikeClick && onLikeClick(item);
                      // update({ liked: !state.liked });
                    }}
                  >
                    {/* {state.liked ? <Liked /> : <Like />} */}
                    {isLiked ? <Liked /> : <Like />}
                  </button>
                  <div
                    onClick={(e) => {
                      e && e.stopPropagation && e.stopPropagation();
                    }}
                  >
                    {/* <Share
                      data={item}
                      position={"top"}
                      pageUrl={`${BASE_UI_URL}/marketplace/listing/?nftCollectionAddress=${item.nftCollectionAddress}&listingId=${item.listingId}`}
                    /> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NftCard;
