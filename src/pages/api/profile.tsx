import { prisma } from "core/providers/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.cookies.cuid;
  const profile = await prisma.users.findUnique({
    where: { id: userId },
    include: { completed_quests: { select: { id: true } } },
  });

  res.status(200).json(profile);
};

export default profile;
