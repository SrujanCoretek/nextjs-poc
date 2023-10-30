"use client";
// import React, { useState } from "react";

// const Input = ({ name, props }: any) => {
//   const [userName, setUserName] = useState("");
//   console.log(userName);
//   return (
//     <div className="relative mb-4">
//       <div
//         className={` rounded-xl overflow-hidden flex gap-4 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
//       >
//         <input placeholder={name} {...props} />
//       </div>
//     </div>
//   );
// };

// export default Input;

import { useState } from "react";
import { useRouter } from "next/navigation";
import { utoa } from "../utils/cookie";

const InputPage = ({ nftCollectionAddress, page, limit }: any) => {
  const router = useRouter();
  const [inputData, setInputData] = useState("");
  const state = {
    searchInput: inputData,
  };
  const handleInputChange = (e: any) => {
    if (e.target.value === "") {
      router.push(
        `/nft/collection?nftCollectionAddress=${nftCollectionAddress}&page=${1}&limit=${limit}`
      );
    }
    setInputData(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ state });
    const stringifiedState = JSON.stringify(state);
    const encodedState = utoa(stringifiedState);
    // console.log({ encodedState });

    router.push(
      `/nft/collection?nftCollectionAddress=${nftCollectionAddress}&page=${1}&limit=${limit}&state=${encodedState}`
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex mt-3 w-full">
        <input
          type="search"
          placeholder="Search"
          value={inputData}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-400 focus:border-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputPage;
