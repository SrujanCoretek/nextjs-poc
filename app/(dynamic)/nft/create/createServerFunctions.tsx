"use server";

export async function uploadToIpfs(file: any) {
  console.log({ file });

  const options = {
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    body: file,
  };

  const response = await fetch(
    "http://localhost:4000/api/v1/nft/upload/to/ipfs",
    options
  );
  const data = await response.json();
  console.log(data);
  return data;
}

// export const login = async (payload: any) => {
//   try {
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     };
//     const response = await fetch(
//       "http://localhost:4000/api/v1/user/login",
//       options
//     );

//     const data = await response.json();
//     setServerCookie("token", data.data.token);
//     return data;
//   } catch (err) {
//     return err;
//   }
// };
