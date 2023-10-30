"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NftCardTwo from "@/src/components/NFtCardTwo";
import usePaginatedFetch from "@/src/utils/usePaginationHook";
import useInput from "@/src/utils/useInput";
import ButtonLoader from "@/src/components/Loaders/buttonLoader";
import { getAllNftsByCollectionAddress } from "@/src/app/serverFunctions/functions";
import { atou } from "@/src/utils/cookie";
import { getEncodedState } from "@/src/utils/helper";

function NftCollectionAddress({ searchParams }: any) {
  const router = useRouter();

  const [searchInputRef, getSearchInput] = useInput(); // input that user enters
  const [searchState, setSearchState] = useState(searchParams?.state);
  const [localState, setLocalState] = useState({});
  const [filterMode, setFilterMode] = useState(false);
  const nftCollectionAddress = searchParams?.nftCollectionAddress;

  const encodedInitialState = getEncodedState({});

  const encodedState = getEncodedState(localState);

  console.log(encodedState);

  const decodedSearchInput = localState ? JSON.parse(atou(encodedState)) : null;

  console.log({ decodedSearchInput });

  const {
    data: docs,
    hasMore,
    getInitialState,
    filterPaginate,
    lastElementRef,
  } = usePaginatedFetch(
    (page) =>
      getAllNftsByCollectionAddress({
        nftCollectionAddress,
        pagination: {
          offset: page,
          limit: 12,
        },
        ...(filterMode && decodedSearchInput.searchInput
          ? { filter: { searchInput: decodedSearchInput?.searchInput } }
          : {}),
      }),
    (respData) => respData?.items
  );

  // Update search state and handle search input change
  const updateSearchState = () => {
    const encodedState = getEncodedState({
      searchInput: searchInputRef.current?.value,
    });
    setSearchState(encodedState);
    setLocalState({
      ...localState,
      searchInput: searchInputRef.current?.value,
    });
  };

  const handleInputChange = async (e: any) => {
    setFilterMode(true);

    if (e.target.value === "") {
      setFilterMode(false);
      setLocalState({});
      getInitialState();
      router.push(
        `/nft/collection?nftCollectionAddress=${nftCollectionAddress}&state=${encodedInitialState}`
      );
    } else {
      updateSearchState();
    }
  };
  console.log({ localState });

  const handleRoute = () => {
    router.push(
      `/nft/collection?nftCollectionAddress=${nftCollectionAddress}&state=${encodedState}`
    );
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      router.push(
        `/nft/collection?nftCollectionAddress=${nftCollectionAddress}&state=${encodedInitialState}`
      );
    }
  }, []);

  async function getFilteredItems() {
    handleRoute();
    // console.log("searchState", searchState);
    // console.log("filterMode", filterMode);
    if (filterMode && searchState) {
      await filterPaginate();
    }
  }

  const handleKeyDown = (e: any) => {
    const searchInput = searchInputRef?.current?.value;

    if (e.key === "Enter" && searchInput !== "") {
      getFilteredItems();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4 text-xl">
      {/* Search input and button */}
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
          onClick={getFilteredItems}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          Search
        </button>
      </div>

      {/* Display NFTs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 sm:px-10 ">
        {docs?.map((item, index) => (
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
            />
          </Link>
        ))}
      </div>

      {/* End of data indicator */}
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
}

export default NftCollectionAddress;
