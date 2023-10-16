"use server";
import React from "react";
import { pagination } from "../../serverFunctions/functions";

import Link from "next/link";

const UserPage = async ({ searchParams }: any) => {
  // console.log(searchParams);
  const page = searchParams?.page || 1;

  let paginationArray = Array.from({ length: 20 }, (_, index) => index + 1);

  const data = await pagination(page);

  return (
    <div className=" flex flex-col justify-center items-center ">
      <h1>UserPage</h1>
      <p>Testing</p>

      <div className="mt-5">
        <ul>
          {data.map((each: any) => (
            <li key={each.id} className="p-1">
              {each.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="flex ">
          {paginationArray.map((each) => (
            <Link key={each} href={`/users?page=${each}`} className="m-2">
              {each}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
