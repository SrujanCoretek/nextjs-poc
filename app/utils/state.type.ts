export type User = {
  id: string;
  walletAddress: string;
  displayName?: string;
  bio: string;
  email: string;
  bioUrl: string;
  portfolioUrl?: string | null;
  profilePicPath?: string | null; // TODO REMOVE
  profilePicUrl?: string | null;
  customUrl?: string | null;
  isVerified: boolean;
  roles: string;
  isKycPassed: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  [key: string]: any | null | undefined;
};

export type Bid = {
  id: number;
  bidAmount: number;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
};

export type NFT = {
  name: string;
  description: string;
  ipfsUrl: string;
  tokenId: string;
  collectionAddress: string;
  attributes: string[] | null | undefined;
  nftId: string;
  imageUrl: string;
  externalUrl: string | null | undefined;
  id: number;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
  [key: string]: any;
};

export type ItemPopularity = {
  id: number;
  listingId: number;
  likes: number;
  wishlisted: number;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
};

export type MarketItem = {
  id: number;
  listinAaddress: string;
  listingId: string;
  quantity: number;
  currency: string;
  saleType: string;
  auctionEndDate: string | null | undefined;
  auctionStartDate: string | null | undefined;
  lotId: string | null | undefined;
  groupId: string | null | undefined;
  reservePricePerToken: string;
  buyoutPricePerToken: string;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
  autoPay: boolean | null | undefined;
  isActive: boolean | null | undefined;
  token: NFT;
  popularity: ItemPopularity | null | undefined;
  owner: User;
  bids: Bid[] | null | undefined;
  priceUsd: number;
  priceCeek: number;
  liked?: boolean | null | undefined; // TODO
  isLiked?: boolean | null | undefined;
  count: number;
  like: boolean | null | undefined;
  activity: [] | null | undefined;
};

export type Auction = {
  reservePricePerToken: string;
  listingAddress: string;
  buyoutPricePerToken: string;
  listingID: string;
  quantity: number;
  currency: string;
  saleType: string;
  auctionEndDate: string | null | undefined;
  auctionStartDate: string | null | undefined;
};

export type WalletBalances = {
  bnbBalance: number;
  ceekBalance: number;
  [key: string]: any;
};

export type AddMinterRes = {
  addMinterResult: any;
  result: {
    userId: number;
    collectionAddress: string;
    isMinter: boolean;
    id: number;
  };
};

export type GetMinterRes = [User[], number];
