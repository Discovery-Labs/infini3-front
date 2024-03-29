import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK } from "@thirdweb-dev/sdk";
// import axios from "axios";
import { constants } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

interface QuestData {
  name: string;
  description: string;
  imagePath: string;
}

const createMint = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Invalid method. Only POST supported.",
    });
  }

  const PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    console.error("Missing ADMIN_PRIVATE_KEY environment variable");
    return res.status(500).json({
      error: "Admin private key not set",
    });
  }

  // Get access token off cookies
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json({
      error: "Must provide an access token to authenticate",
    });
  }

  const RPC_URL = process.env.RPC_URL;
  if (!RPC_URL) {
    console.error("Missing RPC_URL environment variable");
    return res.status(500).json({
      error: "RPC URL key not set",
    });
  }
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.ADMIN_PRIVATE_KEY as string,
    RPC_URL
  );

  // Authenticate token with the SDK
  const domain = "dcompass.xyz";
  const address = await sdk.auth.authenticate(domain, token);

  const contractAddress = process.env.NEXT_PUBLIC_EDITION_ADDRESS || "";
  // const contract = await sdk.getBuiltInContract(contractAddress, "edition");
  const contract = await sdk.getEdition(contractAddress);

  const { questData }: { questData: QuestData } = JSON.parse(req.body);

  // function getBase64(url: string) {
  //   return axios
  //     .get(url, {
  //       responseType: "arraybuffer",
  //     })
  //     .then((response) => Buffer.from(response.data, "binary"));
  // }

  try {
    // const imageData = await getBase64("https://i.imgur.com/irlLOUx.png");

    const nftMetadata = {
      name: questData.name,
      description: questData.description,
      image: questData.imagePath,
    };

    const startTime = new Date();

    const payload = {
      metadata: nftMetadata,
      to: address,
      currencyAddress: NATIVE_TOKEN_ADDRESS,
      tokenId: constants.MaxUint256,
      quantity: 0,
      mintStartTime: startTime,
    };

    const signedPayload = await contract.signature.generate(payload);

    res.status(200).json({
      signedPayload: signedPayload,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

export default createMint;
