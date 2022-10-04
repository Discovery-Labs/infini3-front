import { prisma } from "core/providers/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
  let profile;

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

  try {
    profile = await prisma.users.findUnique({
      where: { address: address },
      include: {
        quests: {
          orderBy: {
            id: "desc",
          },
        },
        completed_quests: { select: { id: true } },
      },
    });
  } catch (error) {
    console.error(error);
  }

  res.status(200).json(profile);
};

export default profile;
