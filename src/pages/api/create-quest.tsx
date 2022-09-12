import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { step_type } from "@prisma/client";
import { prisma } from "core/providers/prisma";

type RawQuestion = {
  type: step_type;
  guide?: string;
  question?: string;
  options?: { value: string }[];
  answer?: { label: string; value: string; colorScheme: string };
};

type RawQuestions = {
  title: string;
  description: string;
  tags: string;
  tokenId: number;
  questions: RawQuestion[];
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
  await sdk.auth.authenticate(domain, token);

  const userId = req.cookies.cuid;

  // Create Quest and its Questions
  const { questData }: { questData: RawQuestions } = JSON.parse(req.body);
  const quests = await prisma.quests.create({
    data: {
      user_id: userId,
      title: questData.title,
      description: questData.description,
      tags: questData.tags,
      token_id: questData.tokenId,
    },
  });

  questData.questions.map(async (question, index) => {
    await prisma.questions.create({
      data: {
        type: question.type,
        guide: question.guide || "",
        question: question.question || "",
        options: question.options?.map((option) => option.value),
        answer: question.answer?.value,
        questsId: quests.id,
        itemIndex: index,
      },
    });
  });

  res.status(200).json(quests);
};

export default createQuest;
