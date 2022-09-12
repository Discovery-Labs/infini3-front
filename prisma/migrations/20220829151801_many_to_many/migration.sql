/*
  Warnings:

  - You are about to drop the column `completed_quest_ids` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "completed_quest_ids";

-- CreateTable
CREATE TABLE "quests_users" (
    "id" SERIAL NOT NULL,
    "usersId" TEXT,
    "questsId" INTEGER,

    CONSTRAINT "quests_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quests_users" ADD CONSTRAINT "quests_users_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quests_users" ADD CONSTRAINT "quests_users_questsId_fkey" FOREIGN KEY ("questsId") REFERENCES "quests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
