import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createQuest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("createQuest api");
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

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.ADMIN_PRIVATE_KEY as string,
    "mainnet"
  );

  // Authenticate token with the SDK
  const domain = "dcompass.xyz";
  const address = await sdk.auth.authenticate(domain, token);

  const userId = req.cookies.cuid;
  const rest = await prisma.quests.create({
    data: {
      user_id: userId,
      title: "title",
      description: "description",
    },
  });
  console.log(
    "🚀 ~ file: create-quest.tsx ~ line 48 ~ createQuest ~ rest",
    rest
  );

  res.status(200).json(address);
};

export default createQuest;
