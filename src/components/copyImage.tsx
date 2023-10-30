/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { toast } from "react-toastify";

const CopyImage = ({ nftCollectionAddress }: any) => {
  return (
    <div>
      <img
        alt="gradient-copy"
        className="cursor-pointer h-4 w-4 lg:h-6 lg:w-6"
        onClick={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(`${nftCollectionAddress}`);
            toast.success("Copied to Clipboard");
          } else {
            toast.error("Cannot be Copied");
          }
        }}
        src="/svg/gradient-copy.svg"
      />
    </div>
  );
};

export default CopyImage;
