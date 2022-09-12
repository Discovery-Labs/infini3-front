/*
  Warnings:

  - Made the column `questsId` on table `questions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_questsId_fkey";

-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "questsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_questsId_fkey" FOREIGN KEY ("questsId") REFERENCES "quests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
