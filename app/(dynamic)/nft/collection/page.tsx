/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import NftCardTwo from "@/app/components/NFtCardTwo";
import { getAllNftsByCollectionAddress } from "@/app/serverFunctions/functions";

import InputPage from "@/app/components/Input";
import { atou } from "@/app/utils/cookie";
import usePaginatedFetch from "@/app/utils/usePaginationHook";
import useInput from "@/app/utils/useInput";
import { useRouter } from "next/navigation";
import ButtonLoader from "@/app/components/Loaders/buttonLoader";
import Link from "next/link";

const NftCollectionAddress = ({ searchParams }: any) => {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState("");
  const [searchInputRef, getSearchInput] = useInput();

  const nftCollectionAddress = searchParams?.nftCollectionAddress;

  const {
    data: docs,
    hasMore,
    resetData,
    getInitialState,
    setDataFilter,
    lastElementRef,
    clearDataFilter,
  } = usePaginatedFetch(
    (page: number) =>
      getAllNftsByCollectionAddress({
        nftCollectionAddress,
        pagination: {
          offset: page,
          limit: 12,
        },
        ...(searchInputRef?.current?.value
          ? { filter: { searchInput: searchInputRef?.current?.value } }
          : {}),
      }),

    (respData) => respData?.items
  );
  console.log({ docs });

  const handleInputChange = async (e: any) => {
    setFilterValue(e.target.value);
    if (e.target.value === "") {
      router.push(
        `/nft/collection?nftCollectionAddress=${nftCollectionAddress}`
      );

      getInitialState();
    }
  };

  async function refreshItems() {
    resetData();
    setDataFilter();
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const searchInput = searchInputRef?.current?.value;

    if (e.key === "Enter" && searchInput !== "") {
      refreshItems();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  mt-4 text-xl">
      {/* <InputPage
        nftCollectionAddress={nftCollectionAddress}
        page={page || 1}
        limit={limit || 12}
        ref={searchInputRef}
      /> */}
      <div className="flex mt-3 w-full justify-center">
        <input
          type="search"
          className="w-50 px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-400 focus:border-blue-400"
          placeholder="Search"
          onChange={handleInputChange}
          value={filterValue}
          onKeyDown={handleKeyDown}
          ref={searchInputRef}
        />
        <button
          onClick={() => refreshItems()}
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
