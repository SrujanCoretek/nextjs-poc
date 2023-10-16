import NftCardTwo from "@/app/components/NFtCardTwo";
import { getPaginationArray } from "@/app/helper";
import { getAllNftsByCollectionAddress } from "@/app/serverFunctions/functions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const NftCollectionAddress = async ({ searchParams }: any) => {
  const nftCollectionAddress = searchParams?.nftCollectionAddress;
  const page = searchParams?.page;
  const limit = searchParams?.limit;
  const pagination = {
    offset: page,
    limit: limit,
  };

  const data = await getAllNftsByCollectionAddress({
    nftCollectionAddress,
    pagination,
  });
  const count = data.data.count;
  const items = data.data.items;
  // console.log(data.data);
  const paginationArray = getPaginationArray(count);

  return (
    <div className="flex flex-col justify-center items-center  mt-40 text-xl">
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
                collectionImageUrl="ipfs://QmekPFe2VBGmFSYdcR7EPaoLVKWsCs76tGpqSTjAhikQjW"
                // handleItemClick={handleItemClick}
              />
            </Link>
          );
        })}
      </div>
      <ul className="flex ">
        {paginationArray.map((each) => (
          <Link
            key={each}
            href={`/nft/collection?nftCollectionAddress=${nftCollectionAddress}&page=${each}&limit=12`}
            className="m-2"
          >
            {each}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NftCollectionAddress;
