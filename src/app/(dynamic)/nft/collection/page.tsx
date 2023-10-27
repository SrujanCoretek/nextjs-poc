/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import NftCardTwo from "@/src/components/NFtCardTwo";
import { getAllNftsByCollectionAddress } from "@/src/app/serverFunctions/functions";
import { atou } from "@/src/utils/cookie";
import usePaginatedFetch from "@/src/utils/usePaginationHook";
import useInput from "@/src/utils/useInput";
import ButtonLoader from "@/src/components/Loaders/buttonLoader";
import { getEncodedState } from "@/src/utils/helper";

const NftCollectionAddress = ({ searchParams }: any) => {
  const router = useRouter();
  const [searchInputRef, getSearchInput] = useInput();
  const [filterMode, setFilterMode] = useState(false);
  const nftCollectionAddress = searchParams?.nftCollectionAddress;
  const searchState = searchParams?.state;
  const decodedState = searchState && JSON.parse(atou(searchState));

  const {
    data: docs,
    hasMore,
    getInitialState,
    filterPaginate,
    lastElementRef,
  } = usePaginatedFetch(
    (page: number) =>
      getAllNftsByCollectionAddress({
        nftCollectionAddress,
        pagination: {
          offset: page,
          limit: 12,
        },
        ...(filterMode && searchState ? { filter: decodedState } : {}),
      }),

    (respData) => respData?.items
  );

  const handleInputChange = async (e: any) => {
    setFilterMode(true);

    if (e.target.value === "") {
      setFilterMode(false);
      router.push(
        `/nft/collection?nftCollectionAddress=${nftCollectionAddress}`
      );

      getInitialState();
    } else {
      const encodedState = getEncodedState({
        searchInput: searchInputRef.current?.value,
      });
      router.push(
        `/nft/collection?nftCollectionAddress=${nftCollectionAddress}&state=${encodedState}`
      );
    }
  };

  async function getFilteredItems() {
    if (filterMode && searchState) await filterPaginate();
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const searchInput = searchInputRef?.current?.value;

    if (e.key === "Enter" && searchInput !== "") {
      getFilteredItems();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  mt-4 text-xl">
      <div className="flex mt-3 w-full justify-center">
        <input
          type="search"
          className="w-50 px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-400 focus:border-blue-400"
          placeholder="Search"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={searchInputRef}
        />
        <button
          onClick={() => getFilteredItems()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 sm:px-10 ">
        {docs?.map((item: any, index: number) => {
          return (
            <Link
              key={index}
              href={`/nft/collection/detail?nftCollectionAddress=${item.nftCollectionAddress}&tokenId=${item.tokenId}`}
            >
              <NftCardTwo
                item={item}
                isLoading={false}
                openItem={true}
                key={index}
                collectionImageUrl="ipfs://QmeXawR1NoDrgKpkHk3XeFTTyjSsqjGjXQvnPPH5wLGDQZ" // temporary
                // handleItemClick={handleItemClick}
              />
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center mt-0" ref={lastElementRef}>
        {docs?.length === 0 || docs === null ? (
          <h1 className="text-2xl ml-4 font-bold pb-14 pt-0">No NFTs Found</h1>
        ) : (
          <h1
            className={`text-2xl ml-4 font-bold text-red-500 text-center pb-14 ${
              hasMore ? "block" : "hidden"
            }`}
          >
            <ButtonLoader />
          </h1>
        )}
      </div>
    </div>
  );
};

export default NftCollectionAddress;
