"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
// import axios from "axios";

// const instance = axios.create({
//   timeout: 360000,
// });

// instance.interceptors.response.use((response) => {
//   return response.data;
// }, null);

export async function setServerCookie(name: any, value: any) {
  cookies().set({
    name: name,
    expires: Date.now() + 60 * 60 * 1000,
    value: value,
    secure: true,
    path: "/",
    sameSite: "strict",
  });
}

export const getUserFromApi = async (walletAddress: string) => {
  // console.log("server", walletAddress);
  if (!walletAddress) {
    throw new Error("required Wallet Address");
  }
  try {
    const token = cookies().get("token");
    if (!token) {
      return { message: "please login" };
    }

    const payload = {
      walletAddress,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(payload),
    };
    const res = await fetch("http://localhost:4000/api/v1/user/get", options);
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const login = async (payload: any) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(
      "http://localhost:4000/api/v1/user/login",
      options
    );

    const data = await response.json();
    setServerCookie("token", data.data.token);
    return data;
  } catch (err) {
    return err;
  }
};

export async function pagination(page: number) {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`,
      {
        next: {
          revalidate: 10,
        },
      }
    );
    const data = await res.json();

    return data.results;
  } catch (error) {
    return error;
  }
}

export async function getAllCollections() {
  try {
    const token = cookies().get("token");

    if (!token) {
      return { message: "please login" };
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      "http://localhost:4000/api/v1/nft/collection/get/all",
      options
    );
    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getAllNftsByCollectionAddress(payload: any) {
  try {
    console.log({ payload });
    // const token = cookies().get("token");
    // if (!token) {
    //   return { message: "please login" };
    // }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    // console.log({ options });
    const res = await fetch(
      "http://localhost:4000/api/v1/nft/collection/nfts/get/all",
      options
    );
    // console.log({ res });
    const data = await res.json();
    // console.log(data.data);
    // console.log("-------------------------------------");
    return [data.data, null] as [any, null];
  } catch (error) {
    return [null, error] as [null, any];
  }
}

export async function getNftFromCollection(payload: any) {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
      // return { message: "please login" };
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    // console.log({ options });
    const res = await fetch(
      "http://localhost:4000/api/v1/nft/collection/get",
      options
    );
    // console.log({ res });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getMarketplaceItem(payload: any) {
  try {
    const token = cookies().get("token");
    if (!token) {
      redirect("/login");
      // return { message: "please login" };
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    // console.log({ options });
    const res = await fetch(
      "http://localhost:4000/api/v1/marketplace/listing/get",
      options
    );
    // console.log({ res });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getAllListings(payload: any) {
  try {
    const token = cookies().get("token");
    if (!token) {
      return { message: "please login" };
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    // console.log({ options });
    const res = await fetch(
      "http://localhost:4000/api/v1/marketplace/listing/get/all",
      options
    );
    // console.log({ res });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
