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
