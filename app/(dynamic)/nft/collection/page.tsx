import NftCardTwo from "@/app/components/NFtCardTwo";
import { getPaginationArray } from "@/app/utils/helper";
import { getAllNftsByCollectionAddress } from "@/app/serverFunctions/functions";
import Link from "next/link";
import React from "react";
import { getClientCookie } from "@/app/utils/cookie";
import { redirect } from "next/navigation";

const NftCollectionAddress = async ({ searchParams }: any) => {
  const nftCollectionAddress = searchParams?.nftCollectionAddress;
  const page = searchParams?.page;
  const limit = searchParams?.limit;
  const pagination = {
    offset: page,
    limit: limit,
  };

  console.log({ page });

  const data = await getAllNftsByCollectionAddress({
    nftCollectionAddress,
    pagination,
  });

  if (data.message) {
    redirect("/login");
  }
  const count = data.data.count;
  const items = data.data.items;
  // console.log(data.data);
  const paginationArray = getPaginationArray(count);

  return (
    <div className="flex flex-col justify-center items-center  mt-4 text-xl">
      {/* <ul>
        {items?.map((each: any) => (
          <Link
            key={each.tokenId}
            href={`/nft/collection/detail?nftCollectionAddress=${each.nftCollectionAddress}&tokenId=${each.tokenId}`}
          >
            <li>{each.name}</li>
          </Link>
        ))}
      </ul> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 sm:px-10 ">
        {items?.map((item: any, index: number) => {
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
                collectionImageUrl="ipfs://QmeXawR1NoDrgKpkHk3XeFTTyjSsqjGjXQvnPPH5wLGDQZ"
                // handleItemClick={handleItemClick}
              />
            </Link>
          );
        })}
      </div>
      <ul className="flex mb-5 ">
        {paginationArray.map((each) => (
          <Link
            key={each}
            href={`/nft/collection?nftCollectionAddress=${nftCollectionAddress}&page=${each}&limit=12`}
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

export default NftCollectionAddress;
