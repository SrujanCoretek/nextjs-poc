/* eslint-disable @next/next/no-img-element */
"use client";
import React, { FC } from "react";
import { NFT_CARD_BACKGROUND } from "../(styles)/styles/themes";
import { processIpfsUrl } from "../helper";
// import Share from "./PopOver/Share";
// import { NFT_CARD_BACKGROUND } from "../styles/theme";
// import type { NftCard } from "../types/ui";
// import { NODE_ENV } from "../conf/env";
// import { processIpfsUrl } from "../utils/helper";
const NODE_ENV = "development";
const BASE_UI_URL =
  NODE_ENV === "development"
    ? "https://dev.nft.ceek.com"
    : "https://nft.ceek.com";

const NftCardTwo = ({ item, collectionImageUrl, handleItemClick }: any) => {
  return (
    <>
      <div
        className="px-2 md:px-4"
        key={item.id}
        onClick={(e) => {
          e && e.stopPropagation && e.stopPropagation();
          handleItemClick && handleItemClick(item);
        }}
      >
        <div className="group relative ">
          <div className={NFT_CARD_BACKGROUND}></div>
          <div className="shadow-xl rounded-3xl h-[380px] w-full  overflow-hidden cursor-pointer bg-white dark:bg-[#0F2775] p-2 flex flex-col justify-between gap-2">
            <div className="h-64 lg:h-[300px] rounded-t-3xl overflow-hidden mb-1">
              <img
                className="w-full h-full object-cover rounded-3xl"
                width="100"
                height="100"
                src={
                  item.imageUrl
                    ? processIpfsUrl(item.imageUrl)
                    : "/images/user3.png"
                }
                alt="NFT"
              />
            </div>
            <div className="flex justify-between gap-2">
              <div className="text-center relative p-2">
                <div className="bg-gradient-to-br from-[#2B0AA6] via-[#FF0FE7] to-[#BF0D42] rounded-full p-1 w-14 h-14 mx-auto md:w-18 md:h-18 ">
                  <img
                    className=" w-full h-full object-cover rounded-full"
                    alt="CompanyIcon"
                    src={
                      collectionImageUrl
                        ? collectionImageUrl
                        : "/svg/collection-display.svg"
                    }
                    width="100"
                    height="100"
                  />
                </div>
              </div>
              <div className="flex-1 ml-2 lg:ml-0 my-auto">
                <p className="text-md lg:text-lg font-semibold cursor-pointer">
                  {item.metadata?.name}
                </p>
                <p className="decoration-gray-600 text-sm lg:text-md">
                  {item.metadata?.description.slice(0, 45)}
                </p>
              </div>
              <div
                className="flex flex-col justify-around"
                onClick={(e) => {
                  e && e.stopPropagation && e.stopPropagation();
                }}
              >
                {/* <Share
                  data={item}
                  position={"top"}
                  pageUrl={`${BASE_UI_URL}/nft/collection/detail/?nftCollectionAddress=${item.nftCollectionAddress}&tokenId=${item.tokenId}`}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftCardTwo;
