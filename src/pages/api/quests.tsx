import { prisma } from "core/providers/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const quests = async (req: NextApiRequest, res: NextApiResponse) => {
  const quests = await prisma.quests.findMany({
    take: 30,
    orderBy: { inserted_at: "desc" },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  res.status(200).json(quests);
};

export default quests;
