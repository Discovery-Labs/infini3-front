import { prisma } from "core/providers/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const quiz = async (req: NextApiRequest, res: NextApiResponse) => {
  const { questId } = JSON.parse(req.body);

  const questWithQuestions = await prisma.quests.findUnique({
    where: {
      id: questId,
    },
    include: {
      questions: {
        orderBy: { itemIndex: "asc" },
      },
    },
  });

  res.status(200).json(questWithQuestions);
};

export default quiz;
