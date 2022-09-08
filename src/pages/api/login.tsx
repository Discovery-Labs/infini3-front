import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { LoginPayload } from "@thirdweb-dev/sdk/dist/src/schema";
import { prisma } from "core/providers/prisma";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const chainOrRpc = process.env.CHAIN_OR_RPC || "polygon";

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.ADMIN_PRIVATE_KEY as string,
    chainOrRpc
  );

  // Get signed login payload from the frontend
  const payload = req.body.payload as LoginPayload;
  if (!payload) {
    return res.status(400).json({
      error: "Must provide a login payload to generate a token",
    });
  }

  // Generate an access token with the SDK using the signed payload
  const domain = "dcompass.xyz";
  const token = await sdk.auth.generateAuthToken(domain, payload);
  const address = await sdk.auth.authenticate(domain, token);

  // Create new user if does not exist
  const user = await prisma.users.upsert({
    where: { address: address },
    update: {},
    create: {
      address: address,
    },
  });

  // Securely set httpOnly cookie on request to prevent XSS on frontend
  // And set path to / to enable access_token usage on all endpoints
  res.setHeader("Set-Cookie", [
    serialize("access_token", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    }),
    serialize("cuid", user.id, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    }),
  ]);

  res.status(200).json("Successfully logged in.");
};

export default login;
