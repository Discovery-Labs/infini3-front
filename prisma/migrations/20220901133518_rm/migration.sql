/*
  Warnings:

  - Made the column `usersId` on table `quests_users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questsId` on table `quests_users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "quests_users" DROP CONSTRAINT "quests_users_questsId_fkey";

-- DropForeignKey
ALTER TABLE "quests_users" DROP CONSTRAINT "quests_users_usersId_fkey";

-- AlterTable
ALTER TABLE "quests_users" ALTER COLUMN "usersId" SET NOT NULL,
ALTER COLUMN "questsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "quests_users" ADD CONSTRAINT "quests_users_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quests_users" ADD CONSTRAINT "quests_users_questsId_fkey" FOREIGN KEY ("questsId") REFERENCES "quests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
