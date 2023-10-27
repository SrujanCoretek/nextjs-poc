import type { User, NFT, ItemPopularity, Bid } from "./state.type";
export interface IFormInputs {
  displayName?: string;
  bio?: string;
  customUrl?: string;
  portfolioUrl?: string;
  email?: string;
  twitter?: string;
}
export interface SigninFormInputs {
  email: string;
  password: string;
}

export interface NftInput {
  collectionAddress: string;
  title: string;
  description: string;
  utility: string[];
  attributes?: string[];
  nftMode?: "fixed" | "timed" | "unlimited" | "";
  price?: { price: string };
  startTime?: string;
  endTime?: string;
  file?: File | null;
  fileUrl: string;
  buyOutPrice?: { price: string };
  mimeType: string;
  tags: [];
}

export interface NftCard {
  item: NFTitem;
  isLoading: boolean;
  openItem: boolean;
  collectionImageUrl: string;
  handleItemClick?: any;
}

export type NFTitem = {
  id: number;
  isActive: boolean;
  listingAddress: string;
  listingID: string;
  listingTransactionHash: string;
  lotID: any | null;
  auctionEndDate: string | null;
  auctionStartDate: string | null;
  autoPay: any | null;
  bids: Bid[] | null;
  blockHash: string;
  blockNumber: string;
  buyoutPricePerToken: string;
  createdAt: string;
  currency: string;
  groupID: any | null;
  popularity: ItemPopularity;
  priceCEEK: number;
  priceUSD: number;
  quantity: string;
  reservePricePerToken: string;
  saleType: "on-auction" | "direct-sale" | unknown;
  updatedAt: string;
  owner: User;
  token: NFT;
  [key: string]: any | null | undefined;
};

export interface DrawerMenu {
  name: string;
  icon: JSX.Element;
  externalLink: string;
}
