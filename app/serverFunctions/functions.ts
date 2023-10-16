"use server";

export const getUserFromApi = async (walletAddress: string) => {
  // console.log("server", walletAddress);
  if (!walletAddress) {
    throw new Error("required Wallet Address");
  }
  try {
    const jwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWVrVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKZmFXUWlPaUkyTkRRd1pXUTBOalJoTTJGbFpXRXhaR0kwWkRFMU1Ea2lMQ0p5YjJ4bElqb3hNQ3dpWW1seWRHaEVZWFJsSWpvaU9EazROek15T0RBd0lpd2lRbE5EVjJGc2JHVjBRV1JrY21WemN5STZJakI0TkRjMVJEQXhOVGN6TVVJd05FSTBNakpCUVVVeU5qZzVNRGN4Um1WbU1ERXpNVEk0UmpVeVFTSXNJbTFoY210bGRFRmtaSEpsYzNNaU9pSWlMQ0pwYzB0WlExQmhjM05sWkNJNlptRnNjMlVzSW1GalkyVnpjMUJ5YjJacGJHVkpaQ0k2SWpZME56ZzFOemhpWkROak5EZ3hZakl5TkdRek9UVTBOeUlzSW5OcFpDSTZJbmswTTJzMGJXNWhlbVZoYlNJc0ltRm5aU0k2TWpVc0luVkJaMlZRWVhKaGJTSTZNVGdzSW1WNGNDSTZNVFk1TnpJNU16TTFNU3dpYVdGMElqb3hOamszTWpBMk9UVXdmUS54a1V4VjNtV0ZiSlZEOVVRWWgzSUJHTjhYc2dPWEMtdEJhUmdaa2ZmSGIwIiwiZW1haWwiOiJTcnVqYW4xNTI3Iiwid2FsbGV0QWRkcmVzcyI6IjB4NDc1RDAxNTczMUIwNEI0MjJBQUUyNjg5MDcxRmVmMDEzMTI4RjUyQSIsImNlZWtWcklkIjoiNjQ0MGVkNDY0YTNhZWVhMWRiNGQxNTA5IiwiaWQiOiJjNjllZjAxNy1lMjU4LTQxMzgtODYwMS02MDJiZDY2OTM4YTciLCJyb2xlIjoidXNlciIsImNsaWVudFR5cGUiOiJ3ZWIiLCJpYXQiOjE2OTcyMDY5NTEsImV4cCI6MTY5NzIxMDU1MX0.uU2JmRsn0kBoudlhgSIjuyW8AL94Uqwytk3BcCoeKgk";
    const payload = {
      walletAddress,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
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
  // console.log(payload);
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
    // console.log({ response });

    const data = await response.json();

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
    return data;
  } catch (error) {
    return error;
  }
}

export async function getNftFromCollection(payload: any) {
  try {
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
