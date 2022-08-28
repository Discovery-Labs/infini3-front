/*
  Warnings:

  - Added the required column `title` to the `quests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quests" ADD COLUMN     "title" TEXT NOT NULL;
