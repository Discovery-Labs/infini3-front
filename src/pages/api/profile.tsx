import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.cookies.cuid;
  const profile = await prisma.users.findUnique({
    where: { id: userId },
    include: { completed_quests: { select: { id: true } } },
  });

  res.status(200).json(profile);
};

export default profile;
