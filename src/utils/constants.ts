// import { NODE_ENV } from "../conf/env";
const NODE_ENV = "production";
const CEEK_VR_BASE_URL =
  NODE_ENV == "production" ? `https://vr.ceek.com` : `https://test.vr.ceek.com`;

export const ERROR_MSG = "No NFT's Found";
export const API_ROUTES = {
  //ipfs
  UPLOAD_TO_IPFS: "nft/upload/to/ipfs",

  GET_APP_SETTINGS: `/app/settings/get`,
  UPDATE_BANNER: `/app/banner/addupsert`,
  UPDATE_BANNER_TEXT: `/app/banner/text/update`,
  UPLOAD_BANNER_SIGNED_URL: `/app/banner/signedurl/put`,
  UPLOAD_TERMS_AND_CONDITIONS: "/app/terms/conditions/add",
  GET_TERMS_AND_CONDITIONS: "/app/terms/conditions/get",

  // user,
  LOGIN_USER: `/user/login`,
  SIGNUP_USER: `${CEEK_VR_BASE_URL}/tv/signUp`, // ??
  FORGOT_PASSWORD: `/user/forgot/password`,
  GET_USER: `/user`,
  UPDATE_USER: `/user/update`,
  UPLOAD_USER_PROFILE_PICTURE_SIGNED_URL: `/user/profilepicture/upload/signedurl`,
  GET_USER_BALANCE: "/user/balance/get",
  GET_USER_PRIVATEKEY: "/user/private/key/get",
  GET_CEEK_USD_PRICE: `/ceek/usd/price`,
  GET_USER_BUNDLES: "/user/bundles/get",
  GET_USER_ONWED_CLOTHS: `${CEEK_VR_BASE_URL}/nft/clothes/owner-clothes`,
  ADD_USER_BUNDLE: "/user/bundle/add",
  GET_BINANCE_USD_PRICE:
    "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd",

  //nft
  CREATE_COLLECTION: `nft/collection/create`,
  DELETE_COLLECTION: `nft/collection/delete`,
  UPSERT_NFT_UTILITIES: `nft/utilities/upsert`,
  DELETE_UTILITY: `nft/utility/delete`,
  GET_ALL_NFT_UTILITIES: `nft/utilities/get`,
  GET_ALL_UTILITIES: `nft/utilities/get/all`,
  UPSERT_SETTINGS: `nft/settings/upsert`,
  DELETE_SETTING: `nft/setting/delete`,
  GET_ALL_SETTINGS: `nft/settings/get/all`,
  GET_USER_NFT_SETTINGS: `nft/user/settings`,
  UPDATE_USER_NFT_SETTING: `nft/user/setting/update`,
  UPDATE_ROLE: `nft/collection/update/role`,
  DELETE_MINTER_FROM_COLLECTION: `nft/collection/delete/minter`,

  GET_ALL_MINTERS: `/nft/minters/all/get`, //required
  UPLOAD_NFT_SIGNED_URL: `/nft/upload/signedurl`,
  MINT_NFT_IN_COLLECTION: `nft/collection/mint`,
  GET_NFT_FROM_COLLECTION: `nft/collection/get`,
  GET_ALL_COLLECTIONS: `nft/collection/get/all`,
  GET_ALL_USER_NFTS: `nft/user/get/all`,
  GET_ALL_NFTS: `nft/explore`,

  //marketplace
  CREATE_MARKETPLACE_CONTRACT: `/marketplace/contract/create`,
  GET_MARKETPLACE_CONTRACT: `/marketplace/contract/get`,
  LIKE_DISLIKE_LISTING: `/marketplace/listing/like-dislike`,

  CREATE_DIRECT_LISTING: `/marketplace/listing/direct/create`,
  UPDATE_LISTING: `/marketplace/listing/set-featured`,
  CANCEL_DIRECT_LISTING: `/marketplace/listing/direct/cancel`,

  BUY_DIRECT_LISTING: `/marketplace/listing/direct/buy`,
  MAKE_OFFER_FOR_DIRECT_LISTING: `/marketplace/listing/direct/make-offer`,
  ACCEPT_OFFER_FOR_DIRECT_LISTING: `/marketplace/listing/direct/accept-offer`,

  CREATE_AUCTION_LISTING: `/marketplace/listing/auction/create`,
  MAKE_BID_FOR_AUCTION_LISTING: `/marketplace/listing/auction/make-bid`,
  // CLOSE_AUCTION_LISTING
  CANCEL_AUCTION_LISTING: `/marketplace/listing/auction/cancel`,
  GET_NEXT_MINIMUM_BID: "/marketplace/bid/minimum/next/get",

  GET_MARKETPLACE_ITEM: "/marketplace/listing/get",
  GET_ALL_NEW_LISTINGS: `/marketplace/listing/new/get/all`,
  GET_ALL_FEATURED_LISTINGS: `/marketplace/listing/featured/get/all`,
  GET_ALL_POPULAR_LISTINGS: `/marketplace/listing/popular/get/all`,
  GET_ALL_LISTINGS: `/marketplace/listing/get/all`,
  GET_ALL_USER_LISTINGS: `/marketplace/listing/user/get/all`,
  GET_ALL_HISTORY: `/marketplace/listing/history/get/all`,
  GET_ALL_BIDSOFFERS: `/marketplace/listing/bids-offers/get/all`,
  GET_ALL_NFTS_FROM_COLLECTION: `nft/collection/nfts/get/all`,

  GET_ALL_FAVOURITE_ITEMS: `/marketplace/get/all/user/liked/items`,
};

export const WHITELISTED_API_ROUTES = [
  API_ROUTES.LOGIN_USER,
  API_ROUTES.SIGNUP_USER,
];

//FILE UPLOADS
export const acceptedTypes: string[] = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/avif",
  "image/gif",
];

export const CONTRACT_ROLE = {
  ADMIN: "admin",
  TRANSFER: "transfer",
  MINTER: "minter",
  PAUSER: "pauser",
  LISTER: "lister",
  ASSET: "asset",
  UNWRAP: "unwrap",
  FACTORY: "factory",
};

// CONTENT
export const CONTENT = {
  banner: {
    editProfile: {
      header: "Edit profile",
      description:
        "You can set preferred display name, create your branded profile URL and manage other personal settings",
    },
    admin: {
      header: "Manage Roles",
      description: "description?",
    },
    create: {
      header: "Create NFT",
      description:
        "You can set preferred display name, create your branded profile URL and manage other personal settings",
    },
  },
  signup: {
    desc_start:
      "Welcome to CEEK VR INC! We are a developer of virtualreality experiences streamed to mobile VR devices and other console, desktop virtual reality devices (“CEEK VR ready devices”).",
    desc_middle:
      "These Terms of Use govern your use of our service. As used in these Terms of Use, “ CEEK VR INC service,” “our service”or “the service” means the service provided by CEEK VR  SOFTWARE AND HARDWARE for discovering and experiencing  virtual reality, including all features and functionalities,  website, and user interfaces, as well as all content and software associated with our service.",
    desc_end:
      "These Terms of Use govern your use of our service. As used  in these Terms of Use, “ CEEK VR INC service,” “our service”  or “the service” means the service provided by CEEK VR SOFTWARE AND HARDWARE for discovering and experiencing virtual reality, including all features and functionalities, website, and user interfaces, as well as all content and  software associated with our service.",
    desc_end1:
      " These Terms of Use govern your use of our service. As used in these Terms of Use, “ CEEK VR INC service,” “our service” or “the service” means the service provided by CEEK VR SOFTWARE AND HARDWARE for discovering and experiencing virtual reality, including all features and functionalities, website, and user interfaces, as well as all content and software associated with our service.",
    desc_end2:
      "As long as you comply with these Terms, you have the right to use the Software for your own personal noncommercial use.This license is for the sole purpose of enabling you to use and enjoy the Software, in the manner permitted by these Terms.",
  },
  create: {},
};

export const CATEGORY_NAME_TYPES = [
  {
    name: "Ceek",
    type: "CEEK",
  },
  {
    name: "Property",
    type: "PROPERTY",
  },
  {
    name: "Rides",
    type: "RIDES",
  },
  {
    name: "VIP Access",
    type: "VIP_ACCESS",
  },
  {
    name: "Wearables",
    type: "WEARABLES",
  },
  {
    name: "BNFT",
    type: "BNFT",
  },
  {
    name: "Test",
    type: "TEST",
  },
];

export const COLLECTION_TYPES = {
  PROPERTY: "PROPERTY",
  WEARABLES: "WEARABLES",
  LAND: "LAND",
  CEEK: "CEEK",
  RIDES: "RIDES",
  VIP_ACCESS: "VIP_ACCESS",
  BNFT: "BNFT",
  TEST: "TEST",
};
