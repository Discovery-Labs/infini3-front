import { ChainId } from "@thirdweb-dev/react";
import { Network } from "alchemy-sdk";

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

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY || "";

export const ALCHEMY_SETTINGS = {
  apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network:
    DESIRED_CHAIN === "mumbai" ? Network.MATIC_MUMBAI : Network.MATIC_MAINNET, // Replace with your network.
};
