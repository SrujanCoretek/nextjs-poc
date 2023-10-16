"use client";
import React, { useState } from "react";
import GetUserButton from "../../components/buttonComponent";
import { getUserFromApi } from "../../serverFunctions/functions";

const Listings = () => {
  const [user, setUser] = useState<any>("");
  const [error, setError] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const handleChange = (e: any) => {
    setWalletAddress(e.target.value);
  };
  // console.log({ walletAddress });

  const handleClick = async () => {
    const data = await getUserFromApi(walletAddress);
    if (data) {
      setUser(data);
      setError(null);
    }

    if (data?.error) {
      setError(data.error.message);
      setUser(null);
    }
    console.log({ data });
    // console.log({ err });
  };

  return (
    <div className="flex flex-col justify-center items-center m-10 ">
      <input className="border-2" onChange={handleChange} />
      <GetUserButton onClick={handleClick} />
      <h1>{user?.data?.email}</h1>
      <p>{error && error}</p>
    </div>
  );
};

export default Listings;
