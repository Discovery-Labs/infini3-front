import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const quiz = async (req: NextApiRequest, res: NextApiResponse) => {
  const { questId } = JSON.parse(req.body);
  const questions = await prisma.questions.findMany({
    where: { questsId: questId },
  });

  res.status(200).json(questions);
};

export default quiz;
