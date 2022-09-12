import { prisma } from "core/providers/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const quiz = async (req: NextApiRequest, res: NextApiResponse) => {
  const { questId } = JSON.parse(req.body);
  const questions = await prisma.questions.findMany({
    where: { questsId: questId },
    orderBy: { itemIndex: "asc" },
    include: {
      quests: {
        select: {
          token_id: true,
        },
      },
    },
  });

  res.status(200).json(questions);
};

export default quiz;
