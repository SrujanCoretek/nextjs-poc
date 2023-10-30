import { utoa } from "./cookie";

export function getPaginationArray(count: number) {
  const pageCount = Math.ceil(count / 12);
  const paginationArray = Array.from(
    { length: pageCount },
    (_, idx) => idx + 1
  );
  return paginationArray;
}

export function processIpfsUrl(inputUrl: string) {
  if (inputUrl?.startsWith("ipfs://")) {
    return inputUrl.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  }
  return inputUrl;
}

export function shortenAddress(address: string) {
  const prefix = address?.substring(0, 6);
  const suffix = address?.substring(address.length - 4, address.length);
  return `${prefix}...${suffix}`;
}

export const openWindow = (
  url: string,
  title = "_blank",
  w = 500,
  h = 500,
  cb = () => {
    // Intentionally empty
  }
) => {
  const hasSpace = window.matchMedia(
    `(min-width: ${w + 20}px) and (min-height: ${h + 20}px)`
  ).matches;

  const targetWidth = hasSpace ? w : null;
  const targetHeight = hasSpace ? h : null;

  const features = [];

  if (targetWidth !== null) {
    features.push(`width=${targetWidth}`);
  }

  if (targetHeight !== null) {
    features.push(`height=${targetHeight}`);
  }

  features.push("scrollbars=1");

  const newWindow = window.open(url, title, features.join(","));

  const timer = setInterval(function () {
    if (newWindow?.closed) {
      clearInterval(timer);
      cb();
    }
  }, 1000);

  return newWindow;
};

export function qp(obj: any) {
  const tokens = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v) {
      tokens.push(`${k}=${v}`);
    }
  }
  return tokens.join("&");
}

export const displayPrice = (priceValue: any) => {
  let price = priceValue;
  if (typeof priceValue == "string") {
    price = parseFloat(priceValue);
  }

  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  return formatter.format(price);
};

export const getEncodedState = (obj: any) => {
  const stringifiedState = JSON.stringify(obj);

  const encodedState = utoa(stringifiedState);
  return encodedState;
};

// export function useReducerPlus<T extends object>(initialState: T) {
//   return useReducer((state: T, update: Partial<T>) => {
//     if (update) {
//       return {
//         ...state,
//         ...update,
//       };
//     }
//     return state;
//   }, initialState);
// }
