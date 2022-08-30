import { prisma } from "core/providers/prisma";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";

type ProfileData = {
  username?: string;
  bio?: string;
};

const createQuest = async (req: NextApiRequest, res: NextApiResponse) => {
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
  await sdk.auth.authenticate(domain, token);

  const userId = req.cookies.cuid;

  // Create Quest and its Questions
  const questData: ProfileData = JSON.parse(req.body);
  const quests = await prisma.users.update({
    where: { id: userId },
    data: { bio: questData.bio, username: questData.username },
  });

  res.status(200).json(quests);
};

export default createQuest;
