/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NftCardTwo from "@/src/components/NFtCardTwo";
import usePaginatedFetch from "@/src/utils/usePaginationHook";
import useInput from "@/src/utils/useInput";
import ButtonLoader from "@/src/components/Loaders/buttonLoader";
import {
  getAllCollections,
  getAllNftsByCollectionAddress,
} from "@/src/app/serverFunctions/functions";
import { atou } from "@/src/utils/cookie";
import { getEncodedState } from "@/src/utils/helper";
import CopyImage from "@/src/components/copyImage";
import { textgradient } from "@/src/styles/themes";
import Dropdown from "@/src/components/Dropdown";

const NODE_ENV = "development";

type CollectionInfo = {
  collectionMinter: null;
  collectionType: string;
  createdAt: string;
  description: string;
  imageUrl: string;
  keywords: string[];
  name: string;
  nftCollectionAddress: string;
  settings: any[]; // Adjust this to match the actual type of 'settings'
  updatedAt: string;
  userId: string;
  utilities: any[]; // Adjust this to match the actual type of 'utilities'
  walletAddress: string;
};

function NftCollectionAddress({ searchParams }: any) {
  const router = useRouter();

  const [searchInputRef, getSearchInput] = useInput(); // input that user enters
  const [searchState, setSearchState] = useState(searchParams?.state);
  const [currentCollection, setCurrentCollection] =
    useState<CollectionInfo | null>(null);
  const [localState, setLocalState] = useState({});
  const [filterMode, setFilterMode] = useState(false);
  const nftCollectionAddress = searchParams?.nftCollectionAddress;

  const encodedInitialState = getEncodedState({});

  const encodedState = getEncodedState(localState);

  // console.log(encodedState);

  const decodedSearchInput = localState ? JSON.parse(atou(encodedState)) : null;

  // console.log({ decodedSearchInput });

  const getCurrentCollection = async () => {
    const result = await getAllCollections();
    // console.log(result);
    if (result.message) {
      router.push("/login");
      return;
    }
    const collections = result?.data;

    const filteredCollection = collections?.filter(
      (each: any) => each.nftCollectionAddress === nftCollectionAddress
    );
    const currentCollectionInfo = filteredCollection[0];

    setCurrentCollection(currentCollectionInfo);
  };

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
  // console.log({ localState });

  const handleRoute = () => {
    router.push(
      `/nft/collection?nftCollectionAddress=${nftCollectionAddress}&state=${encodedState}`
    );
  };

  useEffect(() => {
    getCurrentCollection();
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
    <>
      <div className="grid md:grid-cols-6 lg:grid-cols-4 lg:px-10 lg:pl-14 px-2 md:px-5">
        <div className="w-full h-full col-span-4 md:col-span-2 lg:col-span-1 py-5 lg:py-10 lg:px-5">
          <img
            src={
              currentCollection?.imageUrl
                ? currentCollection.imageUrl
                : "/svg/collection-display.svg"
            }
            className="w-full h-full object-cover rounded-2xl"
            alt="NFT"
          />
        </div>
        <div className="w-full h-full col-span-4 flex flex-col justify-between lg:col-span-3 pt-4 pb-5 px-2   md:px-4 lg:px-8   lg:py-8 ">
          <div>
            <h1 className="md:text-lg lg:text-2xl xl:text-4xl mt-1 lg:mt-8 font-bold">
              {currentCollection?.name}
            </h1>
            <div className=" text-base lg:text-lg xl:text-xl text-gray-600 flex flex-col">
              <p className=" mt-2 lg:mt-8">
                Welcome to the {currentCollection?.name} collection
              </p>
              <p className="mt-2">{currentCollection?.description}</p>

              <div className="flex flex-wrap w-full gap-1 mt-2 lg:mt-4">
                {currentCollection?.keywords?.map((name: any, idx: number) => {
                  return <CollectionUtilityCard name={name} key={idx} />;
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center h-10 gap-1 ">
            <a
              href={`https://${
                NODE_ENV === "development" ? "testnet.bscscan" : "bscscan"
              }.com/address/${nftCollectionAddress}`}
              target="_blank"
              className={` font-bold text-sm lg:text-xl bg-gradient-to-r from-[#30F0F6] via-[#4E0FFF] to-[#F0899E] text-transparent bg-clip-text`}
              rel="noopener noreferrer"
            >
              {currentCollection?.nftCollectionAddress}
            </a>

            <CopyImage nftCollectionAddress={nftCollectionAddress} />
          </div>
        </div>
      </div>
      {/* part-2 */}
      <div className="bg-gradient-to-r  from-[#0C50FF] via-[#619BFE] to-[#FF74F1] pl-4 bg-white bg-opacity-30">
        <div className=" w-full md:h-[92px]  flex flex-col md:flex-row gap-5   py-6 px-6">
          <div
            className="w-full md:w-1/2 relative border-[#5C4EFF] border-2 flex items-center rounded-lg h-[48px] bg-[rgba(255,255,255,0.2)]px-2 bg-white bg-opacity-30
           "
          >
            <input
              type="search"
              className=" rounded-lg  border-none outline-none w-full p-3 placeholder-white  text-xl text-white bg-transparent"
              placeholder="Search"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={searchInputRef}
            />
            <button onClick={getFilteredItems}>
              <img
                alt="search-icon"
                src="/svg/search-icon.svg"
                className="pl-2 my-auto w-8  mr-4"
              />
            </button>
          </div>

          <div className="col-span-2 w-full md:w-[20%] h-[44px]">
            <Dropdown title={"Category"} />
          </div>

          <div className="col-span-2 w-full md:w-[20%] h-[44px]">
            <Dropdown title={"Popular"} />
          </div>
        </div>
      </div>

      {/* part 3 */}

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
    </>
  );
}

const CollectionUtilityCard = ({ name }: any) => {
  return (
    <div
      className={`bg-gradient-to-r from-indigo-500 to-sky-500 p-0.5 rounded-full max-w-auto`}
    >
      <div
        className={`rounded-full flex justify-center bg-white py-1 px-4 gap-4`}
      >
        <div className=" text-transparent bg-clip-text bg-gradient-to-r from-[#0361EE] to-[#2E61E4] text-left text-xs lg:text-base xl:text-lg">
          {name}
        </div>
      </div>
    </div>
  );
};

export default NftCollectionAddress;
