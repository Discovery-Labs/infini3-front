-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "itemIndex" DROP DEFAULT;
DROP SEQUENCE "questions_itemindex_seq";
