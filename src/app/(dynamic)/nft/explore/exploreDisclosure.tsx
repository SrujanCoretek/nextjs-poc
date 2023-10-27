"use client";

import { utoa } from "@/src/utils/cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ExploreDisclosure = () => {
  const router = useRouter();
  const initialState = {
    status: "",
    minPrice: 0,
    maxPrice: 1000000000,
    selectedCollection: "",
    selectedUtility: "",
  };

  const [filterObj, setFilterObj] = useState(initialState);

  const handleRadioClick = (status: any) => {
    setFilterObj({ ...filterObj, status });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log({ name: value });
    const newValue =
      value.trim() === "" ? (name === "minPrice" ? 0 : 1000000000) : value;
    setFilterObj({ ...filterObj, [name]: newValue });
  };

  const getFilterItems = () => {
    const strigifiedObject = JSON.stringify(filterObj);
    const encodedState = utoa(strigifiedObject);
    // console.log({ encodedState });

    router.push(`/nft/explore?page=1&limit=12&state=${encodedState}`);
  };

  return (
    <div className="mt-10 flex mr-10">
      <div className="flex mr-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-1 rounded-full">
            <div className="bg-white w-full h-full grid place-content-center rounded-full">
              <input
                id="all"
                type="radio"
                name="status"
                className={
                  filterObj.status === ""
                    ? "opacity-100 cursor-pointer"
                    : "opacity-0 cursor-pointer"
                }
                checked={filterObj.status === ""}
                onChange={() => handleRadioClick("")}
              />
            </div>
          </div>
          <label
            htmlFor="all"
            onClick={() => handleRadioClick("")}
            className={`font-semibold cursor-pointer ${
              filterObj.status === "all" ? "textgradient" : "text-black"
            }`}
          >
            All
          </label>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-1 rounded-full">
            <div className="bg-white w-full h-full grid place-content-center rounded-full">
              <input
                id="auction1"
                type="radio"
                name="status"
                className={
                  filterObj.status === "auction"
                    ? "opacity-100 cursor-pointer"
                    : "opacity-0 cursor-pointer"
                }
                checked={filterObj.status === "auction"}
                onChange={() => handleRadioClick("auction")}
              />
            </div>
          </div>
          <label
            htmlFor="auction1"
            onClick={() => handleRadioClick("auction")}
            className={`font-semibold cursor-pointer ${
              filterObj.status === "auction" ? "textgradient" : "text-black"
            }`}
          >
            LIVE AUCTION
          </label>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-1 rounded-full">
            <div className="bg-white w-full h-full grid place-content-center rounded-full">
              <input
                id="direct"
                type="radio"
                name="status"
                className={
                  filterObj.status === "direct"
                    ? "opacity-100 cursor-pointer"
                    : "opacity-0 cursor-pointer"
                }
                checked={filterObj.status === "direct"}
                onChange={() => handleRadioClick("direct")}
              />
            </div>
          </div>
          <label
            htmlFor="direct"
            onClick={() => handleRadioClick("direct")}
            className={`font-semibold cursor-pointer ${
              filterObj.status === "direct" ? "textgradient" : "text-black"
            }`}
          >
            Direct
          </label>
        </div>
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="min val"
          name="minPrice"
          className="border-2"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="max val"
          name="maxPrice"
          className="border-2"
          onChange={handleInputChange}
        />
      </div>
      <button
        type="button"
        onClick={getFilterItems}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      >
        Apply
      </button>
    </div>
  );
};

export default ExploreDisclosure;
