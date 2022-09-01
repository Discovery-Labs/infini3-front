import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { prisma } from "core/providers/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const mintBadge = async (req: NextApiRequest, res: NextApiResponse) => {
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

  try {
    const { questId } = JSON.parse(req.body);
    const quest = await prisma.quests.findUnique({
      where: { id: questId },
    });
    if (!quest) throw "quest undefined";

    const signedPayload = await contract.signature.generateFromTokenId({
      tokenId: quest.token_id,
      quantity: "1",
      to: address,
    });

    res.status(200).json({
      signedPayload: signedPayload,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

export default mintBadge;
