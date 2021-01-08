/*
  Warnings:

  - You are about to drop the column `questionFilename` on the `Question` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Question.notebookId_questionFilename_unique` ON `Question`;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `questionFilename`;
