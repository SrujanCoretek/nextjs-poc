/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import ProductButton from "./components/buttonComponent";
import { getAllCollections } from "./serverFunctions/functions";
import { SECTION_WRAPPER } from "./(styles)/styles/themes";

export default async function Home() {
  const response = await getAllCollections();
  const collectionsData = response?.data;

  // console.log(collectionsData.data);

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="flex flex-col">
    //     <h1 className="mb-5">Home Page</h1>
    //     {collectionsData?.data.map((each: any) => (
    //       <>
    //         <div>
    //           <Link
    //             href={`/nft/collection?nftCollectionAddress=${each.nftCollectionAddress}`}
    //             className="cursor-pointer"
    //           >
    //             {each.name}
    //           </Link>
    //         </div>
    //       </>
    //     ))}
    //   </div>
    // </main>
    <div className={` px-4 md:px-0 py-5 md:py-10`}>
      <div className={`${SECTION_WRAPPER} container mx-auto `}>
        <h2 className="text-center text-3xl text-bold">Collections</h2>

        {/* {isLoading && <MultiCardLoader />} */}
        <div className="flex m-2">
          {collectionsData && collectionsData.length > 0 ? (
            collectionsData.map((collection: any, index: number) => (
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
