/* eslint-disable @next/next/no-img-element */
import { textgradient } from "@/app/(styles)/styles/themes";
import { processIpfsUrl, shortenAddress } from "@/app/utils/helper";
import { getNftFromCollection } from "@/app/serverFunctions/functions";
import Head from "next/head";
import React from "react";
import { redirect } from "next/navigation";
// import { Metadata } from "next";

const BASE_UI_URL = "http://localhost:30001/api/v1";
const NODE_ENV = "development";

const CollectionDetailPage = async ({ searchParams }: any) => {
  const nftCollectionAddress = searchParams?.nftCollectionAddress;
  const tokenId = searchParams?.tokenId;

  const data = await getNftFromCollection({ nftCollectionAddress, tokenId });
  if (data.message) {
    redirect("/login");
  }
  const nft = data.data;

  return (
    <>
      <Head>
        <meta
          property="og:url"
          content={`${BASE_UI_URL}/nft/collection/detail/?nftCollectionAddress=${nftCollectionAddress}&tokenId=${tokenId}`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={nft?.name} />
        <meta property="og:description" content={nft?.description} />
        <meta property="og:image" content={nft?.imageUrl} />
        <meta
          property="twitter:url"
          content={`${BASE_UI_URL}/nft/collection/detail/?nftCollectionAddress=${nft?.nftCollectionAddress}&tokenId=${tokenId}`}
        />
        <meta name="twitter:card" content="summary"></meta>
        <meta property="twitter:description" content={nft?.description} />
        <meta property="twitter:image" content={nft?.imageUrl} />
      </Head>
      <div className="h-auto flex mx-auto container">
        <div className="m-2 md:mt-5 lg:m-5 grid grid-cols-1 lg:grid-cols-2 p-1 rounded-lg h-full w-full gap-2 lg:gap-5">
          <div className="xl:py-7">
            <img
              src={processIpfsUrl(nft?.imageUrl)}
              className="rounded-3xl object-cover mx-auto max-h-[480px] min-h-[360px] lg:max-h-[720px] lg:min-h-[520px]"
              alt={nft?.name || "Event name"}
            />
          </div>

          <div className="py-2 lg:py-6 xl:px-9">
            <div className="flex justify-between items-center">
              <p className="text-justify leading-6 text-3xl lg:text-4xl xl:text-6xl font-semibold">
                {nft?.name}
              </p>
              {/* <p className="mr-2 mt-2">
                  <Share
                    data={nft}
                    pageUrl={`${BASE_UI_URL}/nft/collection/detail/?nftCollectionAddress=${nft?.nftCollectionAddress}&tokenId=${tokenId}`}
                  />
                </p> */}
            </div>
            <div className="flex gap-2 mt-2">
              <p
                className={`${textgradient} text-lg md:text-xl font-bold cursor-pointer`}
              >
                <a
                  href={`https://${
                    NODE_ENV === "development" ? "testnet.bscscan" : "bscscan"
                  }.com/address/${nft?.nftCollectionAddress}`}
                  target="_blank"
                  className="hidden sm:block"
                  rel="noopener noreferrer"
                >
                  {nft?.nftCollectionAddress.toUpperCase()}
                </a>
                <a
                  href={`https://${
                    NODE_ENV === "development" ? "testnet.bscscan" : "bscscan"
                  }.com/address/${nft?.nftCollectionAddress}`}
                  target="_blank"
                  className="block sm:hidden"
                  rel="noopener noreferrer"
                >
                  {shortenAddress(nft?.nftCollectionAddress)}
                </a>
              </p>

              <img
                alt="gradient-copy"
                className="cursor-pointer "
                // onClick={() => {
                //   if (navigator.clipboard) {
                //     navigator.clipboard.writeText(
                //       `${nft?.nftCollectionAddress}`
                //     );
                //     toast.success("Copied to Clipboard");
                //   } else {
                //     toast.error("Cannot be Copied");
                //   }
                // }}
                src="/svg/gradient-copy.svg"
              />
            </div>
            <p className="lg:text-lg xl:text-xl mt-2 lg:my-4">
              {nft?.description}
            </p>

            <p className="text-lg font-semibold mt-2">Creator</p>
            <div className="flex items-center justify-start gap-3 mt-2 lg:mt-4">
              <img
                alt="profile"
                className=" bg-slate-500 inline-block h-[4rem] w-[4rem] rounded-full"
                src={
                  nft?.profilePicUrl
                    ? nft?.profilePicUrl
                    : "/images/ceek-min.png"
                }
              />
              <p className="text-lg font-semibold">{nft?.userName}</p>
            </div>
            {/* {nft?.attributes && nft?.attributes.length > 0 && (
                <div className="mt-4 lg:mt-7">
                  <p className="mt-2 font-semibold text-lg">Utilities</p>
                  <div className="flex gap-2 mt-2 lg:gap-4 w-full flex-wrap max-h-11 overflow-y-auto linescrollbar ">
                    {utilities.length > 0 &&
                      utilities.map((item: any, index: number) => (
                        <div
                          className={`bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-0.5 rounded-full `}
                          key={index}
                        >
                          <div
                            className={`rounded-full flex justify-center bg-white py-2 px-4 gap-4 `}
                          >
                            <span className="text-md font-semibold">
                              {item.name ? item.name : item.title}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                  {properties.length > 0 && (
                    <div className="flex flex-col justify-start gap-4 w-fit flex-wrap mt-4 lg:mt-7">
                      <p className="font-semibold text-lg">Trait Types</p>
                      <div className="flex gap-2 lg:gap-4 flex-wrap mt-2 lg:mt-4 max-h-28  overflow-y-auto linescrollbar">
                        {properties.map((item: any, index: number) => (
                          <div
                            className={`bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-0.5 rounded-full mr-2 mb-2`}
                            key={index}
                          >
                            <div
                              className={`rounded-full flex justify-center bg-white py-2 px-4 gap-4 `}
                            >
                              <span className="text-md font-semibold">
                                {item.trait_type || ""} : {item.value || ""}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )} */}
            {nft?.tags && nft?.tags.length > 0 && (
              <div className="mt-4 lg:mt-7">
                <p className=" font-semibold text-lg">Tags</p>
                <div className="flex gap-2 lg:gap-4 w-full flex-wrap mt-2 lg:mt-4 max-h-11 overflow-y-auto linescrollbar">
                  {nft?.tags &&
                    nft?.tags.map((item: any, index: number) => (
                      <div
                        className={`bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-0.5 rounded-full`}
                        key={index}
                      >
                        <div
                          className={`rounded-full flex justify-center bg-white py-2 px-4 gap-4 `}
                        >
                          <span className="text-md font-semibold">{item}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionDetailPage;
