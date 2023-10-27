import Link from "next/link";
import React from "react";

import { redirect } from "next/navigation";

import ExploreDisclosure from "./exploreDisclosure";

import { getPaginationArray } from "@/src/utils/helper";
import { getAllListings } from "@/src/app/serverFunctions/functions";
import InputPage from "@/src/components/Input";
import { atou } from "@/src/utils/cookie";
import NftCard from "@/src/components/NftCard";

const NftExplore = async ({ searchParams }: any) => {
  const ceekUsdPrice = 0.03412474;
  //   const nftCollectionAddress = searchParams?.nftCollectionAddress;
  let decodedState = {
    status: "",
    minPrice: 0,
    maxPrice: 1000000000,
    selectedCollection: "",
    selectedUtility: "",
  };

  let state: string;
  const page = searchParams?.page;
  const limit = searchParams?.limit;

  if (searchParams?.state) {
    state = searchParams?.state;

    decodedState = JSON.parse(atou(state));
    console.log({ decodedState });
  }

  const pagination = {
    offset: page,
    limit: limit,
  };

  console.log({ page });

  const data = await getAllListings({
    pagination,
    filter: decodedState,
  });

  if (data.message) {
    redirect("/login");
  }

  const count = data.data.count;
  const items = data.data.nfts;

  const paginationArray = getPaginationArray(count);

  return (
    <div className="flex flex-col justify-center items-center  mt-4 text-xl">
      <ExploreDisclosure />

      <div className="flex flex-col ">
        <div></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 sm:px-10 ">
        {items.length === 0 ? (
          <p className="text-2xl font-bold">No Results Found</p>
        ) : (
          items.map((item: any, index: number) => (
            <Link
              key={index}
              href={`/marketplace/listing?nftCollectionAddress=${item?.nftCollectionAddress}&listingId=${item.listingId}`}
            >
              <NftCard
                item={item}
                isLoading={false}
                openItem={true}
                key={index}
                ceekUsdPrice={ceekUsdPrice}
                // collectionImageUrl="ipfs://QmeXawR1NoDrgKpkHk3XeFTTyjSsqjGjXQvnPPH5wLGDQZ"
              />
            </Link>
          ))
        )}
      </div>
      <ul className="flex mb-5 ">
        {paginationArray.map((each) => (
          <Link
            key={each}
            href={`/nft/explore?page=${each || 1}&limit=12${
              state !== undefined ? `&state=${state}` : ""
            }`}
            className={`text-[#0D00FF] rounded-lg border-gray-300 px-4 py-2 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              parseInt(page) === each
                ? "bg-gradient-to-r from-pink-400 via-purple-700 to-cyan-400 text-white"
                : ""
            }`}
          >
            {each}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NftExplore;
