"use client";
import React from "react";

const GetUserButton = ({ onClick }: any) => {
  return (
    <div>
      <button className="bg-red-500" onClick={onClick}>
        Click to get User details
      </button>
    </div>
  );
};

export default GetUserButton;
