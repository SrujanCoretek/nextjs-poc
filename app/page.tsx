/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { getAllCollections } from "./serverFunctions/functions";
import { SECTION_WRAPPER } from "./(styles)/styles/themes";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [collections, setCollections] = useState<any>(null);

  async function getCollections() {
    const response = await getAllCollections();

    if (response?.message) {
      router.push("/login");
      return;
    }
    if (response.data) setCollections(response?.data);
  }

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className={` px-4 md:px-0 py-5 md:py-10`}>
      <div className={`${SECTION_WRAPPER} container mx-auto `}>
        <h2 className="text-center text-3xl text-bold">Collections</h2>
        <Link href={`/nft/create`}>
          <button className="bg-red-600 m-4">Create</button>
        </Link>
        <Link href={`/nft/explore?page=1&limit=12`}>
          <button className="bg-red-600">Explore</button>
        </Link>
        {/* {isLoading && <MultiCardLoader />} */}
        <div className="flex m-2">
          {collections && collections.length > 0 ? (
            collections.map((collection: any, index: number) => (
              <Link
                key={index}
                href={`/nft/collection?nftCollectionAddress=${collection.nftCollectionAddress}`}
                className="m-2"
              >
                <div
                  key={index}
                  className={`${
                    collection.collectionType !== "CEEK" &&
                    collection.collectionType !== "BNFT"
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer "
                  }`}
                >
                  <div className="mx-auto rounded-full h-40 w-40 overflow-hidden">
                    <img
                      src={
                        collection?.imageUrl
                          ? collection?.imageUrl
                          : "https://pbs.twimg.com/profile_images/1047966430623424512/22SkLo1e_400x400.jpg"
                      }
                      alt={collection?.name}
                      className="object-center object-cover"
                    />
                  </div>
                  <div
                    className={` text-center mt-2 uppercase text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis`}
                  >
                    {collection?.name}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <span>No Collections Found</span>
          )}
        </div>
      </div>
    </div>
  );
}
