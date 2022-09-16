import { ChainId } from "@thirdweb-dev/react";

const DESIRED_CHAIN = process.env.NEXT_PUBLIC_DESIRED_CHAIN;

export const DESIRED_CHAIN_ID =
  DESIRED_CHAIN === "mumbai" ? ChainId.Mumbai : ChainId.Polygon;

export const EXPLORER_BASE_URL =
  DESIRED_CHAIN === "mumbai"
    ? "https://mumbai.polygonscan.com/"
    : "https://polygonscan.com/";

export const OPENSEA_BASE_URL =
  DESIRED_CHAIN === "mumbai"
    ? "https://opensea.io/assets/matic/"
    : "https://opensea.io/assets/matic/";
