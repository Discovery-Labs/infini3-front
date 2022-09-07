-- AlterTable
CREATE SEQUENCE "questions_itemindex_seq";
ALTER TABLE "questions" ALTER COLUMN "itemIndex" SET DEFAULT nextval('questions_itemindex_seq');
ALTER SEQUENCE "questions_itemindex_seq" OWNED BY "questions"."itemIndex";
